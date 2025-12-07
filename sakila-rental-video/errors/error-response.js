module.exports = {
    notFoundError: function (resourceId, resourceName) {
        return this.notFoundError(`${resourceName} not found for ID ${resourceId}`);
    },
    duplicateItem: function (itemName, resourceName) {
        return this.conflictError(`${resourceName} already exists for ${itemName}`);
    },
    notFoundError: function (message) {
        const  err = new Error(message);
        err.code = 'NOT_FOUND';
        err.status = 404;
        return err;
    },
    conflictError: function (message) {
        const  err = new Error(message);
        err.code = 'CONFLICT';
        err.status = 409;
        return err;
    },
    badRequestError: function (message) {
        const  err = new Error(message);
        err.code = 'BAD_REQUEST';
        err.status = 400;
        return err;
    },
    unauthorizedError: function (message) {
        const  err = new Error(message);
        err.code = 'UNAUTHORIZED';
        err.status = 401;
        return err;
    }
}
