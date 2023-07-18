import { ApiProperty } from '@nestjs/swagger';

export class VerificationCode {
  @ApiProperty({ default: 'edoaurahman@icloud.com' })
  email: string;
  @ApiProperty({ default: 'ERT8GH' })
  verificationCode: string;
}
