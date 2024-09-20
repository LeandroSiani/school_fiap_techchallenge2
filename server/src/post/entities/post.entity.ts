import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPost } from './models/post.interface';

@Entity('posts')
export class Post implements IPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  title: string;

  @Column('text')
  content: string;

  @Column()
  date: Date;

  @Column({
    nullable: true,
  })
  publishDate: Date;

  @Column()
  isPublished: boolean;
}
