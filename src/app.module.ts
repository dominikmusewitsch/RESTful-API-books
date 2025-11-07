import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/entity/book.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // <--- Specify your database type here
      url: 'postgres://dominik:dumdum@localhost:5432/restful_api_books_db',

      entities: [Book, User], // <--- **IMPORTANT:** This array will hold your Entity classes (e.g., [User, Product])
      //     You can also use a glob pattern like ['dist/**/*.entity{.ts,.js}']
      //     but explicitly listing them is often clearer for smaller projects.

      synchronize: true, // <--- **CAUTION: USE ONLY IN DEVELOPMENT!**
      //     This automatically creates/updates your database schema based on entities.
      //     **NEVER use in production** as it can lead to data loss.
      //     Use TypeORM Migrations for production schema changes.

      logging: false, // Set to 'all' or true to see SQL queries in the console (useful for debugging)
    }),
    BooksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
