import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ default: 'edoaurahman@icloud.com' })
  email: string;
}
