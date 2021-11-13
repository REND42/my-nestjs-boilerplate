import { Exclude, Expose } from "class-transformer"
import Post from "src/posts/post.entity"
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"

@Entity()
class Address {
  @PrimaryGeneratedColumn()
  @Exclude()
  public id: number

  @Column()
  @Expose()
  public street: string

  @Column()
  @Expose()
  public city: string

  @Column()
  @Expose()
  public country: string

  @OneToOne(() => User, (user: User) => user.address)
  public user: User

}

export default Address