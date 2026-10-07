import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { PasswordHasher } from '@nestjs/authentication';

const hasher = new PasswordHasher();

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hasher.hash(this.password);
  }
}
