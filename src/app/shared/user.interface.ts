export enum AUTH_LEVEL {
    GUEST = 'Guest',
    USER = 'User',
    ADMIN = 'Admin',
    SUPERUSER = 'SuperUser'
}

export interface User {
    id: number;
    login: string;
    password: string;
    auth_level: AUTH_LEVEL;
}
