import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column()
  userflag: number;

  @Column()
  avatar: string;
}
