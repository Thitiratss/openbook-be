const service = require('../services/customer-service');
const SimpleCustomerDto = require('../dtos/simple-customer-dto');
module.exports = {
    list: async function (req, res) {
        try {
            const includeAddress = req.query.includeAddress || false;
            const {page, pageSize} = req.query;
            pageRequest = {
                page: Number(page) || 1,
                pageSize: Number(pageSize) || 10
            };
            const pageCustomer = await service.getAll(includeAddress, pageRequest);
            simpleCustomers = pageCustomer.data.map(customer => new SimpleCustomerDto(customer));
            pageCustomer.data = simpleCustomers;
            res.json(pageCustomer);
        } catch (e) {
            res.status(500).json({code: e.code, message: e.message, status: e.status});
        }
    },
    get: async function (req, res) {
        const id = Number(req.params.id);
        try {
            const uniqueOne = await service.getById(id);
            res.json(new SimpleCustomerDto(uniqueOne));
        } catch (e) {
            res.status(500).json(
                {code: e.code, message: e.message, status: e.status});
        }
    },
}