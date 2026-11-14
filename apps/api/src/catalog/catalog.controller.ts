import { Controller, Get, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Get('products')
  products(@Query('category') category?: string) { return this.catalog.findAll(category); }

  @Get('categories')
  categories() { return this.catalog.findCategories(); }
}
