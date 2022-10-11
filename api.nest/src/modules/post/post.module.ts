import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostMeta } from './post-meta.entity';
import { TaxonomyModule } from '../taxonomy/taxonomy.module';
import { UserModule } from '../user/user.module';
import { AttachmentModule } from '../attachment/attachment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostMeta]),
    TaxonomyModule,
    UserModule,
    AttachmentModule,
  ],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
