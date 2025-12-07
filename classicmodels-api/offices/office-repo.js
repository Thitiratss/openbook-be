import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient({})

export async function create(office){
    const newOffice = await prisma.offices.create({
        data: office
    });
    return newOffice;
}

export async function getAll(){
    return await prisma.offices.findMany()
}

export async function getById(id){
    return await prisma.offices.findUnique({
        where: { officeCode: id }
    })
}

export async function update(id,data){
    return await prisma.offices.update({
        where: { officeCode: id },
        data: data
    })
}

export async function deleted(id){
    const office = await prisma.offices.findUnique({ where: { officeCode: id } });
    if(!office){
        return null
    }
    return await prisma.offices.delete({
        where : { officeCode : id}
    })
}