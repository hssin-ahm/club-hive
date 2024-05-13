import { User } from './user.model';
import { Club } from './club.model';

export enum Status {
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    PENDING = 'PENDING'
  }
export class RequestToJoin {
    id: number;
    description: string;
    user: User;
    club: Club;
    status: Status;
    userName: string;
    clubName: string;
    userEmail: string;
    userId: number;
    clubImage :string
  
 constructor(id: number,
  clubImage :string,
  description: string, user: User, club: Club, status: Status, userName: string, clubName: string, userEmail: string,userId: number) {
    this.id = id;
    this.description = description;
    this.user = user;
    this.club = club;
    this.status = status;
    this.userName = userName;
    this.clubName = clubName;
    this.userEmail = userEmail; 
    this.userId = userId;
    this.clubImage = clubImage;
}
  }