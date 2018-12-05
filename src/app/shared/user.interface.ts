export enum AUTH_LEVEL {
    GUEST = 1,
    USER = 2,
    ADMIN = 3,
    SUPERUSER = 4
}

export let Roles = {
    [AUTH_LEVEL.GUEST] : 'Guest',
    [AUTH_LEVEL.USER] : 'User',
    [AUTH_LEVEL.ADMIN] : 'Admin',
    [AUTH_LEVEL.SUPERUSER] : 'SuperUser'
};

export interface User {
    id: number;
    login: string;
    password: string;
    auth_level: AUTH_LEVEL;
    authToken?: string;
}
