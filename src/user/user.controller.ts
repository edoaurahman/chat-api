import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { VerificationCode } from './dto/verification-code.dto';
import { LoginDto } from './dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/file-upload.dto';

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

  @Patch(':username')
  @ApiBody({ type: UpdateUserDto, description: 'Update a user by id' })
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(username, updateUserDto);
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

  @Post('/upload-avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto, description: 'Upload avatar' })
  @UseInterceptors(FileInterceptor('avatar'))
  uploadAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file?: Express.Multer.File,
  ) {
    console.log(file);
  }
}
