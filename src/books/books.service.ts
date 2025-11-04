import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BooksService {
  private books = [
    {
      id: '1a2b3c4d-1111-2222-3333-444455556666',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publishedYear: 1925,
    },
    {
      id: '2b3c4d5e-2222-3333-4444-555566667777',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publishedYear: 1960,
    },
    {
      id: '3c4d5e6f-3333-4444-5555-666677778888',
      title: '1984',
      author: 'George Orwell',
      publishedYear: 1949,
    },
    {
      id: '4d5e6f7g-4444-5555-6666-777788889999',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      publishedYear: 1813,
    },
    {
      id: '5e6f7g8h-5555-6666-7777-888899990000',
      title: 'Moby-Dick',
      author: 'Herman Melville',
      publishedYear: 1851,
    },
    {
      id: '6f7g8h9i-6666-7777-8888-999900001111',
      title: 'Brave New World',
      author: 'Aldous Huxley',
      publishedYear: 1932,
    },
    {
      id: '7g8h9i0j-7777-8888-9999-000011112222',
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      publishedYear: 1951,
    },
    {
      id: '8h9i0j1k-8888-9999-0000-111122223333',
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      publishedYear: 1937,
    },
    {
      id: '9i0j1k2l-9999-0000-1111-222233334444',
      title: 'Fahrenheit 451',
      author: 'Ray Bradbury',
      publishedYear: 1953,
    },
    {
      id: '0j1k2l3m-0000-1111-2222-333344445555',
      title: 'Crime and Punishment',
      author: 'Fyodor Dostoevsky',
      publishedYear: 1866,
    },
  ];

  findAll() {
    return this.books;
  }

  findOne(id: string) {
    const book = this.books.find((book) => book.id === id);
    return book;
  }

  create(book: { title: string; author: string; publishedYear: number }) {
    const newBook = {
      id: uuidv4(), // zufällige UUID statt inkrementeller ID
      ...book,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(
    id: string,
    updateBook: { title?: string; author?: string; publishedYear: number },
  ) {
    this.books = this.books.map((book) => {
      if (book.id === id) {
        return { ...book, ...updateBook };
      }
      return book;
    });
    return this.findOne(id);
  }

  delete(id: string) {
    const removedBook = this.findOne(id);

    this.books = this.books.filter((book) => book.id !== id);

    return removedBook;
  }
}
