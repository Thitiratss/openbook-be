import jwt from 'jsonwebtoken';
import 'dotenv/config';
console.log('Secret key: ',process.env.JWT_SECRET);
const userInfo = { id: 1001, username: "somchai", email:"a@x.com",role:"ADMIN" }
const accessToken = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE});
console.log('JWT:', accessToken);
jwt.verify(accessToken, process.env.JWT_SECRET, (err, claims) => {
    if (err) console.log(403, 'Forbidden');
    console.log(claims)
});