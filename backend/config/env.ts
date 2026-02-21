import dotenv from "dotenv";
dotenv.config();

function getEnvVariables(key: string, required: boolean = true) : string {
    const value = process.env[key];
    if (!value && required) {
        throw new Error(`Environment variable ${key} is not set`);
    }
    
    return value as string;
}

export const ENV = {
    PORT : getEnvVariables("PORT") || 5000,
    DB_HOST : getEnvVariables("DB_HOST"),
    DB_USER : getEnvVariables("DB_USER"),
    DB_PASSWORD : getEnvVariables("DB_PASSWORD"),
    DB_NAME : getEnvVariables("DB_NAME"),
    JWT_ACCESS_SECRET : getEnvVariables("JWT_ACCESS_SECRET"),
    JWT_REFRESH_SECRET : getEnvVariables("JWT_REFRESH_SECRET"),
    ACCESS_TOKEN_EXPIRY : getEnvVariables("ACCESS_TOKEN_EXPIRY"),
    REFRESH_TOKEN_EXPIRY : getEnvVariables("REFRESH_TOKEN_EXPIRY"),
}