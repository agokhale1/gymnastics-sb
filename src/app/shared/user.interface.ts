export enum AUTH_LEVEL {
    GUEST = 1,
    USER = 2,
    ADMIN = 3,
    SUPERUSER = 4
}

export interface User {
    id: number;
    login: string;
    password: string;
    auth_level: AUTH_LEVEL;
    authHeader?: string;
}
