import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { Book } from './book.schema';
import { BookService } from './book.service';

@Resolver(of => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(returns => [Book])
  async getBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Query(returns => Book)
  async getBookById(@Args('id', { type: () => ID }) id: string): Promise<Book> {
    return this.bookService.findById(id);
  }

  @Mutation(returns => Book)
  async createBook(
    @Args('title') title: string,
    @Args('author') author: string,
    @Args('userId') userId: string,
    @Args('price') price: number
  ): Promise<Book> {
    return this.bookService.create({ userId,title, author, price });
  }

  @Mutation(returns => Book)
  async updateBook(
    @Args('id', { type: () => ID }) id: string,
    @Args('title') title: string,
    @Args('author') author: string,
    @Args('price') price: number
  ): Promise<Book> {
    return this.bookService.update(id, { title, author, price });
  }

  @Mutation(returns => Boolean)
  async deleteBook(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.bookService.delete(id);
  }


  
}
