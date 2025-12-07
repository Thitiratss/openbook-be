import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient()

const offices = await prisma.offices.findMany();
console.log(offices);