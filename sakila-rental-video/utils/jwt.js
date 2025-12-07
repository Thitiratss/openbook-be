import jwt from 'jsonwebtoken';
import 'dotenv/config';
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRE || "30m";
export const generateToken = (user, age = JWT_EXPIRES) => {
    user.iss = 'sakila_rental_video@bangkok.com';
    return jwt.sign(user, JWT_SECRET,{ expiresIn: age });
};
export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
