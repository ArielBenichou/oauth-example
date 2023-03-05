import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
 const arielb = await prisma.user.create({
    data: {
        username: "arielb",
        password_hash: "$2b$10$JmszoOcH0bARAWiMS4r4Y.SOcscIZH1cmeQhlzYaZJzpqo5VU3kau", // 1234
        salt: "$2b$10$JmszoOcH0bARAWiMS4r4Y."
    },
  })
  const myTestApp = await prisma.appRegisteration.create({
      data: {
          name: "MyTestApp",
          client_id: "1234"
      }
  });

  console.log({arielb, myTestApp})
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
