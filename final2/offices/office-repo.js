import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

//post
export async function create(office){
    const newOffice = await prisma.offices.create({
        data: office
    })
    return newOffice
}

//get all
export async function getAll(){
    return await prisma.offices.findMany()
}

//get by id
export async function getById(id){
    return await prisma.offices.findUnique({
        where: {officeCode: id}
    })
}

//update
export async function update(id,data){
    return await prisma.offices.update({
        where: {officeCode: id},
        data: data
    })
}

//remove
export async function deleted(id){
    return await prisma.offices.delete({
        where: {officeCode: id}
    })
}
