import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'Edo' })
  name: string;

  @ApiProperty({ default: 'edoaurahman@icloud.com' })
  email: string;
}
