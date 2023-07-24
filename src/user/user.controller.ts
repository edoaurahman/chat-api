import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { VerificationCode } from './dto/verification-code.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto, description: 'Create a new user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/username/:username')
  findByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto, description: 'Update a user by id' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('/login')
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  login(@Body() email: LoginDto) {
    return this.userService.login(email);
  }

  @Post('/verification-code')
  @ApiBody({ type: VerificationCode })
  @HttpCode(202)
  verificationCode(@Body() verificationCode: VerificationCode) {
    return this.userService.verificationCode(verificationCode);
  }
}
