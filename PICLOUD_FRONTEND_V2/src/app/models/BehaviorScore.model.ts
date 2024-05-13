import { Membership } from './membership.model';
import { Event } from './event.model';

export enum BehaviorType {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
  ATTENDANCE = 'ATTENDANCE',
  PARTICIPATION = 'PARTICIPATION',
  PERFORMANCE = 'PERFORMANCE',
  OTHER = 'OTHER'
}

export class BehaviorScore {
  id: number | null;
  membership: Membership | null;
  behaviorType: BehaviorType | null;;
  score: number | null;
  dateRecorded: string | null;; 
  description: string | null;;
  event: Event;

  constructor(
    id: number | null,
    membership: Membership | null,
    behaviorType: BehaviorType  | null,
    score: number | null,
    dateRecorded: string | null,
    description: string | null,
    event: Event
  ) {
    this.id = id;
    this.membership = membership;
    this.behaviorType = behaviorType;
    this.score = score;
    this.dateRecorded = dateRecorded;
    this.description = description;
    this.event = event;
  }
}
