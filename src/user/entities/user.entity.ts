import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 30 })
  name: string;

  @Column('varchar', { name: 'email', length: 50, unique: true })
  email: string;

  @Column('varchar', { length: 6, name: 'verification_code', unique: true })
  verificationCode: string;

  @Column('datetime', { name: 'verified_at', nullable: true })
  verifiedAt: Date;
}
