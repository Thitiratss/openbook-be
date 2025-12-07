import * as authService from "../services/auth-service.js";
import errResp from "../errors/error-response.js";
import { verifyToken } from "../utils/jwt.js";

export const register = async (req, res) => {
    const result = await authService.registerUser(req.body);
    res.status(201).json(result);
};

export const verify = async (req, res) => {
    try {
        let { token } = req.body;
        if (!token) token = req.query.token;
        if (!token) throw errResp.badRequestError("Token is required");

        const userFromToken = verifyToken(token);
        if (userFromToken.verifyKey == undefined)
            throw errResp.unauthorizedError("Invalid verification data");

        const result = await authService.verifyEmail(userFromToken);
        res.status(200).json(result);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    const user = req.body;
    const result = await authService.login(user);
    res.status(200).json(result);
};
