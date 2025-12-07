import * as service from './office-service.js'

export async function createOffice(req, res){
    const office = req.body;
    const newOffice = await service.createOffice(office);
    res.json(newOffice);
}

export async function getAllOffice(req, res){
    try{
        const office = await service.getAllOffice()
        res.status(200).json(office);
    }catch(error){
        res.status(500).json({error: "Server Error"});
    }
}

export async function getOfficeById(req, res){
    try{
        const id = req.params.id;
        const office = await service.getOfficeById(id)
        if(!office){
            return res.status(404).json({error: "Office not found"});
        }
        res.status(200).json(office);
    }catch(error){
        res.status(500).json({error: "Server Error"});
    }
}

export async function updateOffice(req, res){
    try{
        const id = req.params.id;
        const data = req.body;
        const updated = await service.upDateOffice(id,data)

        res.status(200).json(updated);
    }catch (error){
        res.status(500).json({error: "Server Error"});
    }
}

export async function deleteOffice(req,res){
    try{
        const id = req.params.id;
        const deleted = await service.deleteOffice(id)

        if(!deleted){
            return res.status(404).json({error: "Office not found"});
        }
        res.status(200).json({message: "Office deleted successfully"});
    }catch (error){
        res.status(500).json({error: "Server Error"});
    }
}