import { Meet } from './meet.interface';
import { Gymnast } from './gymnast.interface';

export interface Score {
    score_id: number;
    meet: Meet;
    gymnast: Gymnast;
    event: Event;
    score: number;
}
