import { Gym } from './gym.interface';

export interface Gymnast {
    gymnast_id: number;
    gym_id: Gym;
    gymnast_active: boolean;
    gymnast_first_name: string;
    gymnast_last_name: string;
    gymnast_level: string;
    gymnast_img_url: string;
}
