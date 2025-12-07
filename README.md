# openbook-be

use node 24.11.1
view engine: none

npm install mysql2

npm install prisma@6.19.0 @prisma/client@6.19.0

======================================================
#short-id
npm install short-unique-id
const ShortUniqueId = require('short-unique-id');

const uid = new ShortUniqueId({ length: 10 });
const shortId = uid.rnd();

console.log(shortId);
=======================================================

res.status
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Server Error