import prisma from "../src/services/prisma-service.js"

async function main() {

  const prod1 = await prisma.product.create({
    data: {
      name: 'Resistor 330k',
      summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Praesent dictum velit a neque vulputate.`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Praesent varius dignissim lacus, quis venenatis ex bibendum eu. Sed 
      interdum ullamcorper turpis, vel imperdiet ante dictum nec. Sed fringilla 
      nunc lacus, id consectetur ligula rhoncus a. Nam non diam nisl. Donec 
      pretium felis ante, id congue mi pulvinar a. Praesent eros enim, tempus 
      eu cursus vitae, pellentesque eget dolor. Sed vel lorem consequat, 
      pharetra massa non, sollicitudin est. Vivamus ullamcorper ligula eu auctor 
      scelerisque. Fusce viverra tincidunt dolor, in luctus arcu ultrices in. 
      Aliquam et tempus est.`,
      price: 0.25
    }
  })
  const prod2 = await prisma.product.create({
    data: {
      name: 'LED Bargraph',
      summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Praesent dictum velit a neque vulputate.`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Praesent varius dignissim lacus, quis venenatis ex bibendum eu. Sed 
      interdum ullamcorper turpis, vel imperdiet ante dictum nec. Sed fringilla 
      nunc lacus, id consectetur ligula rhoncus a. Nam non diam nisl. Donec 
      pretium felis ante, id congue mi pulvinar a. Praesent eros enim, tempus 
      eu cursus vitae, pellentesque eget dolor. Sed vel lorem consequat, 
      pharetra massa non, sollicitudin est. Vivamus ullamcorper ligula eu auctor 
      scelerisque. Fusce viverra tincidunt dolor, in luctus arcu ultrices in. 
      Aliquam et tempus est.`,
      price: 5.42
    }
  })
  const prod3 = await prisma.product.create({
    data: {
      name: 'Op-amp',
      summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Praesent dictum velit a neque vulputate. consectetur adipiscing elit. 
      Praesent dictum velit a neque vulputate.`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Praesent varius dignissim lacus, quis venenatis ex bibendum eu. Sed 
      interdum ullamcorper turpis, vel imperdiet ante dictum nec. Sed fringilla 
      nunc lacus, id consectetur ligula rhoncus a. Nam non diam nisl. Donec 
      pretium felis ante, id congue mi pulvinar a. Praesent eros enim, tempus 
      eu cursus vitae, pellentesque eget dolor. Sed vel lorem consequat, 
      pharetra massa non, sollicitudin est. Vivamus ullamcorper ligula eu auctor 
      scelerisque. Fusce viverra tincidunt dolor, in luctus arcu ultrices in. 
      Aliquam et tempus est.`,
      price: 10.0
    }
  })
  const prod4 = await prisma.product.create({
    data: {
      name: 'LCD Display',
      summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Praesent dictum velit a neque vulputate.`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Praesent varius dignissim lacus, quis venenatis ex bibendum eu. Sed 
      interdum ullamcorper turpis, vel imperdiet ante dictum nec. Sed fringilla 
      nunc lacus, id consectetur ligula rhoncus a. Nam non diam nisl. Donec 
      pretium felis ante, id congue mi pulvinar a. Praesent eros enim, tempus 
      eu cursus vitae, pellentesque eget dolor. Sed vel lorem consequat, 
      pharetra massa non, sollicitudin est. Vivamus ullamcorper ligula eu auctor 
      scelerisque. Fusce viverra tincidunt dolor, in luctus arcu ultrices in. 
      Aliquam et tempus est.`,
      price: 15.0
    }
  })
  const user1 = await prisma.user.create({
    data: {
      username: 'MusicFreak456',
      passHash: '$2b$10$w7IuC2n2wGyr2AodXx6dTuwv/3kP6Y/pBkf91Hd4HmYl1gtPsUIRy', // "password"
      name: 'Cezary',
      surname: 'Świtała',
      email: 'test@test.com',
      phoneNumber: '123 456 789',
      dateOfBirth: new Date(1970, 1, 1),
      isAdmin: true,
    }
  })
  const user2 = await prisma.user.create({
    data: {
      username: 'Telpenarmo',
      passHash: '$2b$10$w7IuC2n2wGyr2AodXx6dTuwv/3kP6Y/pBkf91Hd4HmYl1gtPsUIRy', // "password"
      name: 'Jakub',
      surname: 'Grabarczuk',
      email: 'test2@test.com',
      phoneNumber: '123 456 789',
      dateOfBirth: new Date(1970, 1, 1),
      isAdmin: true,
    }
  })
  await prisma.order.create({
    data: {
      userId: user1.id,
      placingTime: new Date(1970, 1, 1),
      orderItems: {
        create: [{
          productId: prod1.id,
          quantity: 2
        }]
      }
    }
  })
  await prisma.order.create({
    data: {
      userId: user2.id,
      placingTime: new Date(1970, 1, 1),
      orderItems: {
        create: [{
          productId: prod1.id,
          quantity: 1
        }]
      }
    }
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
