import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();
export const findAll = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            active: true,
        }
    });
}
export const create = async (user) => {
    return await prisma.user.create({
        data: user,
    });
}
export const findById = async (id) => {
    return await prisma.user.findUnique({
        where: {id: id},
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            active: true,
        }
    });
}
export const findByEmail= async (email) => {
    return await prisma.user.findFirst({
        where: {email: email},
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            active: true,
            password: true,
        }
    });
}
export const update = async (id, data) => {
    return await prisma.user.update({
        where: {id: id},
        data : data,
    });
}
