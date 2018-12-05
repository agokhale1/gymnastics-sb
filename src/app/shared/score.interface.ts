import { Meet } from './meet.interface';
import { Gymnast } from './gymnast.interface';

export interface Score {
    score_id: number;
    meet_id: Meet;
    gymnast_id: Gymnast;
    event_id: Event;
    score: number;
}
