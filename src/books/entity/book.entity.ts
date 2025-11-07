import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // This decorator tells TypeORM that this class is a database entity (table)
export class Book {
  @PrimaryGeneratedColumn('uuid') // Marks 'id' as the primary key, and it auto-increments
  id: string;

  @Column({ nullable: false }) // 'firstName' column, string, max 100 chars, not null
  title: string;

  @Column({ nullable: false }) // 'lastName' column, can be null
  author: string; // `?` in TypeScript means the property is optional

  @Column({ name: 'publishedyear', nullable: false }) // 'email' column, unique and not null
  publishedYear: number;
}
