import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import PostNotFoundException from './exception/postNotFound.exception';
import Post from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post, "project2")
    private postRepository: Repository<Post>
  ) {}

  getAllPosts() {
    return this.postRepository.find({ relations: ['author'] })
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne(id, { relations: ['author'] })
    if(post) {
      return post
    }
    // throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
    throw new PostNotFoundException(id)
  }

  async createPost(post: CreatePostDto, user: User) {
    const newPost = await this.postRepository.create({
      ...post, 
      author: user
    })
    await this.postRepository.save(newPost)
    return newPost
  }

  async updatePost(id: number, post: UpdatePostDto) {
    await this.postRepository.update(id, post)
    const updatedPost = await this.postRepository.findOne(id, { relations: ['author'] })
    if(updatedPost) {
      return updatedPost
    }
    // throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
    throw new PostNotFoundException(id)
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postRepository.delete(id)
    if(!deleteResponse.affected) {
      // throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
      throw new PostNotFoundException(id)
    }
  }
}
