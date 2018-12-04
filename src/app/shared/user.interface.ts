export enum AUTH_LEVEL {
    GUEST = 0,
    USER = 1,
    ADMIN = 2,
    SUPERUSER = 3
}

export interface User {
    id: number;
    login: string;
    password: string;
    authLevel: AUTH_LEVEL;
}
