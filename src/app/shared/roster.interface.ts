import { Gym } from './gym.interface';
import { Gymnast } from './gymnast.interface';

export interface Roster {
    id: number;
    gym: Gym;
    gymnasts: Gymnast[];
}
