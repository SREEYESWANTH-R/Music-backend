import { Request, Response } from "express";
import * as authService from "./auth.services";


export const register = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    const user = await authService.register(email, password, name);
    res.status(201).json({ message: "User registered successfully", user });
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await authService.login(email, password);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // true in production (HTTPS)
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({ message: "User logged in successfully", accessToken });
}

export const refresh = async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    const newAccessToken = await authService.refreshToken(token);
    res.status(200).json({ message: "Token refreshed successfully", newAccessToken });
}

export const logout = async (req: Request, res: Response) => {
    const sessionId = req.body.sessionId;
    await authService.logout(sessionId);
    res.status(200).json({ message: "User logged out successfully" });
}

export const logoutAll = async (req: Request, res: Response) => {
    const userId = req.body.userId;
    await authService.logoutAll(userId);
    res.status(200).json({ message: "User logged out successfully" });
}