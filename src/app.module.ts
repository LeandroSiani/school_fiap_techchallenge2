import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';

console.log('configuration', configuration());
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configuration().database.host,
      port: configuration().database.port,
      username: configuration().database.username,
      password: configuration().database.password,
      database: configuration().database.database,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PostModule,
  ],
})
export class AppModule {}
