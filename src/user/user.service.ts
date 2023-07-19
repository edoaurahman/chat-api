import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { VerificationCode } from './dto/verification-code.dto';
import { LoginDto } from './dto/login.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    private readonly mailerService: MailerService,
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
      .toUpperCase();

    user.verifiedAt = null;
    user.verificationCode = verificationCode;

    await this.sendCodeByEmail(user.email, verificationCode);
    await this.userRepository.save(user);
    return {
      message:
        'OTP sent successfully, check your email. if not found check on spam',
    };
  }

  async verificationCode(verificationCode: VerificationCode) {
    const { email, verificationCode: code } = verificationCode;
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
    user.verificationCode = '';
    user.verifiedAt = new Date();
    await this.userRepository.save(user);

    // return status code 200
    return {
      message: 'User verified',
    };
  }

  async create(createUserDto: CreateUserDto) {
    const { name, email } = createUserDto;
    const verificationCode = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    const user = { name, email, verificationCode };

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

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
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
      await this.mailerService.sendMail({
        to: email,
        from: '"ChatMe" <edoaurahman@gmail.com>',
        subject: 'OTP Verification',
        html: `<p>Your otp code is : <h1>${code}</h1></p>`,
      });
      console.log('Email sent');
    } catch (e) {
      console.log(e);
      throw new HttpException('OTP not sent', 500);
    }
  }
}
