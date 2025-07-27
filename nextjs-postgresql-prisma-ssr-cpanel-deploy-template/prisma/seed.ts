import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Delete all existing data
  await prisma.user.deleteMany()

  // Create users
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
    },
  })

  await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
