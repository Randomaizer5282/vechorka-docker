import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { TaxonomyService } from './taxonomy.service';
import { ApiKeyGuard } from '../../utils/guards/api-key.guard';
import { TaxonomyGetTermDto } from './dto/taxonomy.dto';

@UseGuards(ApiKeyGuard)
@Controller('taxonomies')
export class TaxonomyController {
  constructor(private readonly termService: TaxonomyService) {}

  @Get(':slug')
  getTaxonomy(@Param('slug') slug: string, @Query() query: TaxonomyGetTermDto) {
    return this.termService.getOneTaxonomy(slug, query?.taxonomyType);
  }
}
