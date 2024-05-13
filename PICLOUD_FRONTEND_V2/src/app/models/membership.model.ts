import { Department } from './department.model';
import { BehaviorScore } from './BehaviorScore.model';
import { Finance } from './Finance.model';
import { User } from './user.model'; // Make sure to import User model
import { Club } from './club.model'; // Make sure to import Club model

export class Membership {
  id: number | null = null;
  behaviorscores: BehaviorScore[] = [];
  finances: Finance[] = [];
  user: User | null = null;
  club: Club | null = null;
  president: boolean = false;
  responsable: boolean = false;
  department: Department | null = null;

  constructor(id?: number, behaviorscores?: BehaviorScore[], finances?: Finance[], user?: User, club?: Club, president?: boolean, responsable?: boolean, department?: Department) {
    this.id = id || null;
    this.behaviorscores = behaviorscores || [];
    this.finances = finances || [];
    this.user = user || null;
    this.club = club || null;
    this.president = president || false;
    this.responsable = responsable || false;
    this.department = department || null;
  }
}