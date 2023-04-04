import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConfigModule } from '@config/database/config.module';
import { MysqlConfigService } from '@config/database/config.service';
import { User } from '@models/users/entities/user.entity';
import { Category } from '@models/categories/entities/category.entity';
import { Plan } from '@models/plans/entities/plan.entity';
import { Subscription } from '@models/subscriptions/entities/subscription.entity';
import { Post } from '@models/posts/entities/post.entity';
import { Tag } from '@models/tags/entities/tag.entity';
import { PostToUser } from '@models/post_comment/entities/post_comment.entity';
import { Follows } from '@models/users/entities/follow.entity';
import { PostLike } from '@models/post_like/entities/post_like.entity';
import { Author } from '@models/authors/entities/author.entity';
import { Book } from '@models/books/entities/book.entity';
import { Publisher } from '@models/publishers/entities/publisher.entity';
import LocalFile from '@models/local-files/entities/localFiles.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [MysqlConfigModule],
      useFactory: (mysqlConfigService: MysqlConfigService) => ({
        type: 'mysql',
        host: mysqlConfigService.host,
        port: mysqlConfigService.port,
        username: mysqlConfigService.username,
        password: mysqlConfigService.password,
        database: mysqlConfigService.database,
        entities: [
          LocalFile,
          Author,
          Publisher,
          Book,
          PostLike,
          Follows,
          PostToUser,
          Tag,
          Post,
          Subscription,
          Plan,
          User,
          Category,
        ],
        synchronize: true,
      }),
      inject: [MysqlConfigService],
    }),
  ],
})
export class MysqlDatabaseProviderModule {}
