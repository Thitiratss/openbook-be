import ShortUniqueId from "short-unique-id";
import * as repo from './office-repo.js'

const uid = new ShortUniqueId({length: 10})

export async function createOffice(office){
    office.officeCode = uid.rnd()
    return await repo.create(office)
}

export async function getAllOffice(){
    return await repo.getAll()
}

export async function getOfficeById(id){
    return await repo.getById(id)
}

export async function updateOffice(id,data){
    return await repo.update(id,data)
}

export async function deleteOffice(id){
    return await repo.deleted(id)
}