import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book Not Found');
    }
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = this.bookRepository.create({
      id: uuidv4(), // zufällige UUID statt inkrementeller ID
      ...createBookDto,
    });
    return this.bookRepository.save(newBook);
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);
    const update = { ...book, ...updateBookDto };
    return this.bookRepository.save(update);
  }

  async delete(id: string): Promise<Book> {
    const removedBook = await this.findOne(id);
    await this.bookRepository.remove(removedBook);
    return removedBook;
  }
}
