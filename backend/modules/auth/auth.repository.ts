import {pool} from "../../config/database"
import { AuthSql } from "./auth.sql";

export const createUser = async (email: string, password_hash: string, name: string) => {
    const [result] : any = await pool.execute(AuthSql.createUser, [email, password_hash, name]);
    return result;
}

export const findUserByEmail = async (email: string) => {
    const [result] : any = await pool.execute(AuthSql.getUserByEmail, [email]);
    return result[0];
}

export const findUserByPhone = async (phone: string) => {
    const [result] : any = await pool.execute(AuthSql.getUserByPhone, [phone]);
    return result[0];
}

export const createSession = async (user_id: number, refresh_token: string, expires_at: Date) => {
    const [result] : any = await pool.execute(AuthSql.createSession, [user_id, refresh_token, expires_at]);
    return result;
}

export const findSessionByToken = async (refresh_token: string) => {
    const [result] : any = await pool.execute(AuthSql.findSessionByToken, [refresh_token]);
    return result[0];
}

export const revokeSession = async (id: number) => {
    const [result] : any = await pool.execute(AuthSql.revokeSession, [id]);
    return result;
}

export const revokeAllSessions = async (user_id: number) => {
    const [result] : any = await pool.execute(AuthSql.revokeAllSessions, [user_id]);
    return result;
}