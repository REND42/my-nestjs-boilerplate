import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
import { UsersModule } from './users/users.module';

import AppConfig from './config/app.config';
import { mysqlConfig, postgresConfig } from "./config/database.config";
import { validationSchema } from './config/validation';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        AppConfig, mysqlConfig, postgresConfig
      ],
      validationSchema
    }),
    TypeOrmModule.forRootAsync({
      // name: 'project1',
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get<ConnectionOptions>('database'),
      inject: [ConfigService]
    }),
    TypeOrmModule.forRootAsync({
      name: 'project2',
      imports: [ ConfigModule ],
      useFactory: (configService: ConfigService) => configService.get<ConnectionOptions>('postgres'),
      inject: [ ConfigService ]
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}