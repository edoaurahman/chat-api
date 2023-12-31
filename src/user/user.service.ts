import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { VerificationCode } from './dto/verification-code.dto';
import { LoginDto } from './dto/login.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const verificationCode = Math.random()
      .toString(36)
      .substring(2, 8)
      .toLowerCase();

    user.verifiedAt = null;
    user.verificationCode = verificationCode;

    await this.sendCodeByEmail(user.email, verificationCode);
    await this.userRepository.save(user);
    return {
      message:
        'OTP sent successfully, check your email. if not found check on spam',
      username: user.username,
    };
  }

  async verificationCode(verificationCode: VerificationCode) {
    const { email, verificationCode: code, fcmToken } = verificationCode;
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new HttpException('User not found', 404);
    }
    if (user.verifiedAt !== null) {
      throw new HttpException('User already verified, try relogin', 400);
    }
    if (user.verificationCode !== code) {
      throw new HttpException('Wrong verification code', 401);
    }
    user.verificationCode = null;
    user.verifiedAt = new Date();
    user.fcmToken = fcmToken;
    await this.userRepository.save(user);

    // return status code 200
    return {
      message: 'User verified',
    };
  }

  async create(createUserDto: CreateUserDto) {
    const { username, email } = createUserDto;

    // check if user has been registered
    const check = await this.userRepository.findOneBy({ email });
    if (check) {
      throw new HttpException('User already exists', 400);
    }

    const verificationCode = Math.random()
      .toString(36)
      .substring(2, 8)
      .toLowerCase();

    const user = { username, email, verificationCode };

    await this.sendCodeByEmail(user.email, verificationCode);

    await this.userRepository.save(user);

    return {
      message:
        'OTP sent successfully, check your email. if not found check on spam',
    };
  }

  findAll() {
    const user = this.userRepository.find();
    return user;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    await this.userRepository.remove(user);
    return {
      message: 'User removed',
    };
  }

  async sendCodeByEmail(email: string, code: string) {
    try {
      firstValueFrom(
        this.httpService.post('https://mailer.edodev.my.id/send', {
          from: 'noreply',
          to: email,
          subject: 'Verification Code',
          html: `<p>Verification Code: ${code}</p>`,
        }),
      );
    } catch (e) {
      console.log(e);
      throw new HttpException('OTP not sent', 500);
    }
  }

  async findByUsername(username: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username LIKE :username', { username: `%${username}%` })
      .getMany();
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }
}
