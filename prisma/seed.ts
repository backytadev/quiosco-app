import { PrismaClient } from '@prisma/client';
import { categories } from './data/categories';
import { products } from './data/products';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({
  adapter,
  log: ['query'],
});

async function main() {
  try {
    console.log('🔄 Limpiando base de datos...');

    await prisma.$transaction([
      prisma.orderProducts.deleteMany(),
      prisma.order.deleteMany(),
      prisma.product.deleteMany(),
      prisma.category.deleteMany(),
    ]);

    // Reiniciar los IDs autoincrementales (PostgreSQL)
    await prisma.$executeRawUnsafe(
      `ALTER SEQUENCE "Category_id_seq" RESTART WITH 1`,
    );
    await prisma.$executeRawUnsafe(
      `ALTER SEQUENCE "Product_id_seq" RESTART WITH 1`,
    );

    // Insertar nuevos datos
    console.log('🌱 Insertando datos...');
    await prisma.category.createMany({ data: categories });
    await prisma.product.createMany({ data: products });

    console.log('✅ Seed ejecutado correctamente.');
  } catch (error) {
    console.error('❌ Error en el seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
