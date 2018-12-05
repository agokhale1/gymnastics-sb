import { Gym } from './gym.interface';

export enum GYMNAST_LEVEL {
    NA = 'N/A'
}

export interface Gymnast {
    gymnast_id: number;
    gym: Gym;
    active: boolean;
    firstName: string;
    lastName: string;
    level: GYMNAST_LEVEL;
}
