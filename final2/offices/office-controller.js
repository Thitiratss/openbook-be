import * as service from './office-service.js'

export async function createNewOffice(req,res){
    try{
        const office = req.body
        const newOffice = await service.createOffice(office)
        res.status(200).json(newOffice)
    }catch(error){
        res.status(500).json({error: "Server Error"})
    }

}

export async function getAllOffice(req,res){
    try{
        const office = await service.getAllOffice()
        res.status(200).json(office)
    }catch (error){
        res.status(500).json({error: "Server Error"})
    }
}

export async function getOfficeById(req,res){
    try{
        const id = req.params.id
        const office = await service.getOfficeById(id)
        if(!office){
            res.status(404).json({error: `id ${id} not found`})
        }
        return res.status(200).json(office)
    }catch(error){
        res.status(500).json({error: "Server Error"})
    }
}

export async function updateOffice(req,res){
    try{
        const id = req.params.id
        const data = req.body
        const office = await service.updateOffice(id,data)
        if(!office){
            res.status(404).json({error: `id ${id} not found`})
        }
        if(!data){
            res.status(400).json({error: "Missing data for update"})
        }
        return res.status(200).json(office)
    }catch (error){
        res.status(500).json({error: "Server Error"})
    }
}

export async function deleteOffice(req,res){
    try{
        const id = req.params.id
        const office = await service.deleteOffice(id)
        if(!office){
            res.status(404).json({error: `id ${id} not found`})
        }
        return res.status(200).json({message: `Successfully deleted office id ${id}`})
    }catch(error){
        res.status(500).json({error: "Server Error"})
    }
}