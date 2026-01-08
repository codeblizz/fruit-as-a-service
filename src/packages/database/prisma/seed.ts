import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing fruits
  await prisma.fruit.deleteMany({});
  
  // Seed fruits
  const fruits = [
    {
      name: 'Apple',
      description: 'Crisp and sweet, our premium apples are perfect for snacking, baking, or adding to salads. Grown with care in our sustainable orchards.',
      price: 299, // $2.99 in cents
      stock: 100,
      imageUrl: '/images/fruits/apple.jpg',
      category: 'Core Fruits',
      seasonal: true,
      organic: true
    },
    {
      name: 'Orange',
      description: 'Juicy and tangy, our oranges are packed with vitamin C and bursting with sunshine flavor. Excellent for juicing or eating fresh.',
      price: 199, // $1.99 in cents
      stock: 100,
      imageUrl: '/images/fruits/orange.jpg',
      category: 'Citrus Fruits',
      seasonal: false,
      organic: true
    },
    {
      name: 'Pineapple',
      description: 'Sweet and tropical, our pineapples are harvested at peak ripeness for maximum flavor. Perfect for desserts, smoothies, or grilling.',
      price: 499, // $4.99 in cents
      stock: 100,
      imageUrl: '/images/fruits/pineapple.jpg',
      category: 'Tropical Fruits',
      seasonal: false,
      organic: false
    },
    {
      name: 'Mango',
      description: 'Rich and aromatic, our mangoes are the gold standard of tropical fruits. Enjoy them fresh, in smoothies, or in savory dishes.',
      price: 349, // $3.49 in cents
      stock: 100,
      imageUrl: '/images/fruits/mango.jpg',
      category: 'Tropical Fruits',
      seasonal: true,
      organic: false
    },
    {
      name: 'Fig',
      description: 'Delicate and honeyed, our figs are a gourmet delight. Enjoy them fresh with cheese, in salads, or as a sophisticated dessert.',
      price: 599, // $5.99 in cents
      stock: 100,
      imageUrl: '/images/fruits/fig.jpg',
      category: 'Exotic Fruits',
      seasonal: true,
      organic: true
    }
  ];

  for (const fruit of fruits) {
    await prisma.fruit.create({
      data: fruit
    });
  }

  // Create admin user
  await prisma.user.upsert({
    where: { email: 'admin@fruitasaservice.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@fruitasaservice.com',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // password is "password"
      role: 'ADMIN',
      address: '123 Main St',
      city: 'Fruitville',
      state: 'CA',
      postalCode: '90210',
      country: 'USA',
      phone: '555-123-4567'
    }
  });

  const fruitCount = await prisma.fruit.count();
  console.log(`Database seeded with ${fruitCount} fruits`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

