import { Catch, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Catch()
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UsersRepository: Repository<User>,
  ) {}

  //Create a new user in the database
  async create(
    email: string,
    password: string,
    nickname: string,
  ): Promise<User | boolean> {
    //check if email exists
    const userExists = await this.findByEmail(email);
    console.info('Checking if user exists..');
    if (userExists) {
      return false;
    }

    const user = new User();
    user.email = email;
    user.nickname = nickname;
    console.info('Encrypting password');
    user.password = await bcrypt.hash(password, +process.env.SECRET);
    console.info('Creating the user..');
    return await this.UsersRepository.save(user);
  }

  //Find the user by email
  async findByEmail(email: string): Promise<User> {
    return await this.UsersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findById(id: number): Promise<User> {
    return await this.UsersRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
