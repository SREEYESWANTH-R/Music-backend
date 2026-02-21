export const AuthSql = {
    createUser: ` 
        INSERT INTO users (email,password_hash,name)
        VALUES (?,?,?)
    `,

    getUserByEmail: `
        SELECT id,email,password_hash,name,is_email_verified,is_deleted FROM users WHERE email = ?
    `,

    getUserByPhone: `
        SELECT id,email,password_hash,name,is_email_verified,is_deleted FROM users WHERE phone = ?
    `,

    createSession: `
        INSERT INTO user_session (user_id,refresh_token,expires_at)
        VALUES (?,?,?)
    `,

    getUserSession: `
        SELECT * FROM user_session WHERE user_id = ?
    `,

    findSessionByToken: `
        SELECT * FROM user_session WHERE refresh_token = ? AND is_revoked = FALSE AND expires_at > NOW()
    `,

    revokeSession: `
        UPDATE user_session SET is_revoked = TRUE WHERE id = ?
    `,

    revokeAllSessions: `
        UPDATE user_session SET is_revoked = TRUE WHERE user_id = ?
    `
}    