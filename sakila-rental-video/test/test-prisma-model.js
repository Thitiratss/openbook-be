const {PrismaClient} = require('../generated/prisma');
const prisma = new PrismaClient();

async function test() {
    return await prisma.customer.findUnique({
            where: {id: 1},
            include: {
                address: {
                    include: {
                        city: {
                            include: {
                                country: true
                            }
                        }
                    }
                }
            }
        }
    )
}

async function main() {
    const result = await test();
    console.log(result);
}

main();