export const AuthSql = {
    createUser: ` 
        INSERT INTO user (email,phone,password,name,role)
        VALUES (?,?,?,?,?)
    `,

    getUserByEmail: `
        SELECT * FROM user WHERE email = ?
    `,

    getUserByPhone: `
        SELECT * FROM user WHERE phone = ?
    `,

    createSession: `
        INSERT INTO user_session (user_id,refresh_token,expires_at)
        VALUES (?,?,?)
    `,

    getUserSession: `
        SELECT * FROM user_session WHERE user_id = ?
    `,
    findSessionByToken : `
        SELECT * FROM user_session WHERE refresh_token = ? AND is_revoked = false AND expires_at > NOW()
    `,
    
    revokeSession : `
        UPDATE user_session SET is_revoked = true WHERE id = ?
    `,

    revokeAllSessions : `
        UPDATE user_session SET is_revoked = true WHERE user_id = ?
    `    
}    