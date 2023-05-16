import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { PostModule } from '../post/post.module';
import { TaxonomyModule } from '../taxonomy/taxonomy.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    PostModule,
    TaxonomyModule,
    CacheModule.register({
      ttl: 60000, // ml seconds
      // max: 10, // maximum number of items in cache
    }),
  ],
  providers: [SettingsService],
  controllers: [SettingsController],
  exports: [SettingsService],
})
export class SettingsModule {}
