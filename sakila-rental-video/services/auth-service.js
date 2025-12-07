import errResp from "../errors/error-response.js";
import argon2 from "argon2";
import { generateToken } from "../utils/jwt.js";
import * as repo from "../repositories/user-repository.js";
import { sendVerificationEmail } from "../utils/email.js";

const argon2Param = {
    type: argon2.argon2id,
    memoryCost: 102400,
    timeCost: 3,
    parallelism: 2
};

export const registerUser = async (data) => {
    const { email, password } = data;
    const existing = await repo.findByEmail(email);
    if (existing) throw errResp.duplicateItem("User", email);

    data.password = await argon2.hash(password, argon2Param);
    const user = await repo.create(data);

    const token = generateToken(
        { id: user.id, verifyKey: await argon2.hash(user.email, argon2Param) },
        "7d"
    );

    sendVerificationEmail(email, token)
        .then(() => console.log(`Verification email to ${email} has been sent`))
        .catch((err) => console.error("Email error:", err.message));

    return { id: user.id, email: user.email, role: user.role, username: user.username };
};

export const verifyEmail = async (userFromToken) => {
    const existing = await repo.findById(userFromToken.id);
    if (!existing) throw errResp.notFoundError("User does not exist");
    if (existing.active) throw errResp.conflictError(`User ${existing.email} is already active`);

    const valid = await argon2.verify(userFromToken.verifyKey, existing.email);
    if (!valid) throw errResp.unauthorizedError("Invalid verification data");

    existing.active = true;
    const user = await repo.update(existing.id, existing);
    user.password = undefined;
    return user;
};

export const login = async (data) => {
    const { email, password } = data;
    const user = await repo.findByEmail(email);
    if (!user) throw errResp.unauthorizedError("Invalid email or password");
    if (!user.active) throw errResp.unauthorizedError("User is not active");

    const valid = await argon2.verify(user.password, password);
    if (!valid) throw errResp.unauthorizedError("Invalid email or password");

    user.password = undefined;
    const token = generateToken(user);
    return { access_token: token };
};
