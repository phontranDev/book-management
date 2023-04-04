import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from '@config/app/config.module';
import { MysqlConfigModule } from '@config/database/config.module';
import { MysqlDatabaseProviderModule } from '@providers/database/mysql/provider.module';
import { UsersModule } from '@models/users/users.module';
import { CategoriesModule } from '@models/categories/categories.module';
import { JwtConfigModule } from '@config/jwt/config.module';
import { AuthenticationModule } from '@authentication/authentication.module';
import { PlansModule } from '@models/plans/plans.module';
import { CreditCardsModule } from '@models/credit_cards/credit_cards.module';
import { SubscriptionsModule } from '@models/subscriptions/subscriptions.module';
import { PostsModule } from '@models/posts/posts.module';
import { CloudinaryConfigModule } from '@config/cloudinary/config.module';
import { CloudinaryModule } from '@models/cloudinary/cloudinary.module';
import { BooksModule } from '@models/books/books.module';
import { AuthorsModule } from '@models/authors/authors.module';
import { PublishersModule } from '@models/publishers/publishers.module';
import { LocalFilesModule } from '@models/local-files/local-files.module';
import { ChargeModule } from '@models/charge/charge.module';
import { PostCommentModule } from '@models/post_comment/post_comment.module';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', '/*'),
    // }),
    ChargeModule,
    LocalFilesModule,
    BooksModule,
    AuthorsModule,
    PublishersModule,
    PostCommentModule,
    CloudinaryModule,
    PostsModule,
    SubscriptionsModule,
    CreditCardsModule,
    PlansModule,
    UsersModule,
    JwtConfigModule,
    AppConfigModule,
    CategoriesModule,
    MysqlConfigModule,
    MysqlDatabaseProviderModule,
    AuthenticationModule,
    CloudinaryConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
