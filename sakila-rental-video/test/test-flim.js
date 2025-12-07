const{PrismaClient}=require("../generated/prisma");
const prisma = new PrismaClient();

async function getAllFlim(filterTitle) {
    const films = await  prisma.film.findMany(
        { where: {
            title : {contains : filterTitle} // title like '%{filterTitle}%'
            }
        }
    );
    console.log(films);
}
    
getAllFlim('america')