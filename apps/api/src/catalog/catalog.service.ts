import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(category?: string) {
    return this.prisma.product.findMany({
      where: { status: 'ACTIVE', ...(category ? { category: { slug: category } } : {}) },
      include: { category: true, images: { orderBy: { sortOrder: 'asc' } }, variants: { where: { isActive: true }, orderBy: { priceKobo: 'asc' } } },
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
    });
  }

  findCategories() {
    return this.prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } });
  }
}
