export const GET_ALL_USERS = `
    SELECT * FROM users;
`;

export const GET_USER_BY_ID = `
    SELECT * FROM users
    WHERE id_user = ?;
`;

export const INSERT_USER = `
    INSERT INTO users (username, password, first_name, last_name, email)
    VALUES (?, ?, ?, ?, ?);
`;

export const DELETE_USER = `
    DELETE FROM users
    WHERE id_user = ?;
`;
