import { Exclude, Transform } from "class-transformer";
import Category from "../categories/categories.entity";
import { User } from "../users/user.entity";
import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  // @Exclude()
  public id?: number

  @Column()
  public title: string

  @Column()
  public content: string

  @Column({ nullable: true })
  // @Transform(({ value }) => {
  //   if(value != null) {
  //     return value
  //   }
  // })
  public category?: string

  @Index('post_authorId_index')
  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User

  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  public categories: Category[]
}

export default Post