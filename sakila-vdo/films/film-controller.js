const service = require("./film-service");
module.exports = {
    get: async function (req, res) {
        const id = Number(req.params.id);
        try {
            const uniqueOne = await service.getById(id);
            res.json(uniqueOne);
        } catch (e) {
            res.status(e.status || 500).json(
                {code: e.code, message: e.message, status: e.status});
        }
    },
    update: async function (req, res) {
        const data = req.body;
        const id = Number(req.params.id);
        const film = await service.update(id, data);
        res.json(film);
    },
    create: async function (req, res) {
        const data = req.body;
        const film = await service.create(data);
        res.json(film);
    },
}