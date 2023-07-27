import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'edoaurahman' })
  username: string;

  @ApiProperty({ default: 'edoaurahman@icloud.com' })
  email: string;
}
