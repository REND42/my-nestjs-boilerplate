import { Exclude, Expose } from 'class-transformer';
import Post from '../posts/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import Address from './address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  public id: number;

  @Column()
  @Expose()
  public username: string

  @Column({ unique: true })
  @Expose()
  public email: string

  @Column()
  @Exclude()
  public password: string

  @OneToOne(() => Address, {
    eager: true,
    cascade: true
  })
  @JoinColumn()
  @Expose()
  public address?: Address

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts?: Post[]

  // @Column({ default: true })
  // active: boolean;
}