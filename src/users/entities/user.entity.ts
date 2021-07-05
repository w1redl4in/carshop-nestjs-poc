import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserProfile {
  DEFAULT = 'DEFAULT',
  ADM = 'ADM',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  document: string;

  @Column({
    enum: UserProfile,
    default: UserProfile.DEFAULT,
    type: 'enum',
  })
  @ApiProperty()
  profile: UserProfile;
}
