const {PrismaClient} = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports = {
    findById: async function (fid) {
        return await prisma.film.findUnique({
            where: {id: fid},
            include: {
                film_actor: {include: {actor: true}},
                film_category: {include: {category: true}},
            },
        });
    },
    update: async function (fid, data) {
        ({actors, ...film} = data);
        return await prisma.film.update({
            where: {id: fid},
            data: film,
        });
    },
    create: async function (data) {
        return await prisma.film.create({
            data: data,
        });
    },
    findByTitle: async function (title) {
        return await prisma.film.findFirst({
            where: {title: title}
        });
    }
}