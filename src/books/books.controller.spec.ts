import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entity/book.entity';

describe('BooksController', () => {
  let controller: BooksController;
  let mockBooksService: Partial<BooksService>;

  beforeEach(async () => {
    // Mock des BooksService
    mockBooksService = {
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue({} as Book),
      create: jest.fn().mockResolvedValue({} as Book),
      update: jest.fn().mockResolvedValue({} as Book),
      delete: jest.fn().mockResolvedValue({} as Book),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [{ provide: BooksService, useValue: mockBooksService }],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
