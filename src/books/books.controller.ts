import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Post()
  create(
    @Body() book: { title: string; author: string; publishedYear: number },
  ) {
    return this.booksService.create(book);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    bookUpdate: { title?: string; author?: string; publishedYear: number },
  ) {
    return this.booksService.update(id, bookUpdate);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.booksService.delete(id);
  }
}
