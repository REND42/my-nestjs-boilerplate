import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/createUser.dto';
import { User } from './user.entity';

// export type User = any

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, 'project2')
    private readonly usersRepository: Repository<User>
  ) {}

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData)
    await this.usersRepository.save(newUser)
    return newUser
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email })
    if(user) {
      return user
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async findById(id: number) {
    const user = await this.usersRepository.findOne({id})
    if(user) {
      return user
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND)
  }


  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(email: string): Promise<User> {
    return this.usersRepository.findOne({email});
  }
}
