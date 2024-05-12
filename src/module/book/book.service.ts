import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private readonly bookModel: Model<BookDocument>) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findById(id: string): Promise<Book> {
    return this.bookModel.findById(id).exec();
  }

  async create(book: any): Promise<Book> {
    const newBook = new this.bookModel(book);
    return newBook.save();
  }

  async update(id: string, updateBookDto: Partial<Book>): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.bookModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}
