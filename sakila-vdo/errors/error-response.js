module.exports = {
    notFoundError: function (id, resource) {
        const  err = new Error(`${resource} not found for ID ${id}`);
        err.code = 'NOT_FOUND';
        err.status = 404;
        return err;
    },
    duplicateItem: function (itemName, resource) {
        const  err = new Error(`${resource} already exists for ${itemName}`);
        err.code = 'DUPLICATE_RESOURCE';
        err.status = 409;
        return err;
    }
}
