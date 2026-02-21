import { createSession, createUser, findSessionByToken, findUserByEmail, revokeAllSessions, revokeSession } from "./auth.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { ENV } from "../../config/env";

const generateAccessToken = (userId: number) => {
    const accessToken = jwt.sign({ userId }, ENV.JWT_ACCESS_SECRET, { expiresIn: ENV.ACCESS_TOKEN_EXPIRY as any });
    return accessToken;
}

const generateRefreshToken = () => {
    return crypto.randomBytes(40).toString("hex");
}

const hashToken = (token: string) => {
    return crypto.createHash("sha256").update(token).digest("hex");
}

export const register = async (email: string, password: string, name: string) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(email, hashedPassword, name);
    return newUser;
}


export const login = async (email: string, password: string) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        throw new Error("Invalid Credentials");
    }
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken();
    const hashedRefreshToken = hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await createSession(user.id, hashedRefreshToken, expiresAt);
    return { accessToken, refreshToken };
}

export const refreshToken = async (refreshToken: string) => {
    if (!refreshToken) {
        throw new Error("Refresh token not found");
    }

    const hashedRefreshToken = hashToken(refreshToken);
    const session = await findSessionByToken(hashedRefreshToken);
    if (!session) {
        throw new Error("Invalid refresh token");
    }
    const newAccessToken = generateAccessToken(session.user_id);
    return newAccessToken;
}


export const logout = async (sessionId: number) => {
    await revokeSession(sessionId);
};
export const logoutAll = async (userId: number) => {
    await revokeAllSessions(userId);
}