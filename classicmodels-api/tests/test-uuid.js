const ShortUniqueId = require('short-unique-id')

const uid = new ShortUniqueId({ length: 10});

const shortId = uid.rnd()
console.log(shortId);