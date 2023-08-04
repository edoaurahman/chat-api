import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({ type: 'file', format: 'image/jpeg' })
  avatar: any;
}
