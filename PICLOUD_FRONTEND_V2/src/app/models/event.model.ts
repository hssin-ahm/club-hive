// event.model.ts

import { BehaviorScore } from './BehaviorScore.model';

export class Event {
  id: number | any;
  name: string | null;
  date: Date | null ;
  location: string | null ;
  behaviorScores: BehaviorScore[] | null;

  constructor(
    id: number,
    name: string,
    date: Date,
    location: string,
    behaviorScores: BehaviorScore[]
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.location = location;
    this.behaviorScores = behaviorScores;
  }
}
