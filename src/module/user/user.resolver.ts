import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.schema';
import { Book } from '../book/book.schema';
import { Controller, Get, Post } from '@nestjs/common';


@Resolver('User')
@Controller('user')

export class UserResolver {
  bookService: any;
  constructor(private readonly userService: UserService) {}

  @Query(returns => [User])
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(returns => User)
  async getUserById(@Args({ name: 'id', type: () => ID }) id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Mutation(returns => User)
  async createUser(@Args('name') name: string, @Args('email') email: string): Promise<User> {
    return this.userService.create({ name, email });
  }

  @Mutation(returns => User)
  async updateUser(@Args('id', { type: () => ID }) id: string, @Args('name') name: string, @Args('email') email: string): Promise<User> {
    return this.userService.update(id, { name, email });
  }

  @Mutation(returns => Boolean)
  async deleteUser(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.userService.delete(id);
  }
  @Query(returns => [User])
  async getUsersAndBooks(): Promise<User[]> {
    return this.userService.getUsersWithBooks();
  }

  // @Get('/get')
  // async getUsersAndBooks1(): Promise<User[]> {
  //   return this.userService.getUsersWithBooks();
  // }
}
