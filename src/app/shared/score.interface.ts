import { Meet } from './meet.interface';
import { Gymnast } from './gymnast.interface';

export interface Score {
    id: number;
    meet: Meet;
    gymnast: Gymnast;
    event: Event;
    score: number;
}
