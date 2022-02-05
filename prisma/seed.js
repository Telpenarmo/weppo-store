import prisma from "../src/services/prisma-service.js"

async function main() {
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()

  await prisma.product.createMany({
    skipDuplicates: true,
    data: [{
      id: 0,
      name: 'Resistor 330k',
      summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Praesent dictum velit a neque vulputate.`,
      price: 0.25
    }, {
      id: 1,
      name: 'LED Bargraph',
      summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Praesent dictum velit a neque vulputate.`,
      price: 5.42
    }, {
      id: 2,
      name: 'Op-amp',
      summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Praesent dictum velit a neque vulputate. consectetur adipiscing elit. 
  Praesent dictum velit a neque vulputate.`,
      price: 10.0
    }, {
      id: 3,
      name: 'LCD Display',
      summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Praesent dictum velit a neque vulputate.`,
      price: 15.0
    }]
  })
  await prisma.user.createMany({
    skipDuplicates: true,
    data: [{
      id: 0,
      username: 'MusicFreak456',
      passHash: '$2b$10$w7IuC2n2wGyr2AodXx6dTuwv/3kP6Y/pBkf91Hd4HmYl1gtPsUIRy', // "password"
      name: 'Cezary',
      surname: 'Świtała',
      email: 'test@test.com',
      phoneNumber: '123 456 789',
      dateOfBirth: new Date(1970, 1, 1)
    }, {
      id: 1,
      username: 'Telpenarmo',
      passHash: '$2b$10$w7IuC2n2wGyr2AodXx6dTuwv/3kP6Y/pBkf91Hd4HmYl1gtPsUIRy', // "password"
      name: 'Jakub',
      surname: 'Grabarczuk',
      email: 'test2@test.com',
      phoneNumber: '123 456 789',
      dateOfBirth: new Date(1970, 1, 1)
    }
    ]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
