import { Quiz, Test } from "./quiz";
import { Membership } from '../models/membership.model';
export class Club {
 
    constructor(
      public id?: number,
      public name?: string,
      public description?: string,
      public contactInfo?: string,
      public logo?: string,
      public tests?: Test[],
      
      
  ) {}
  }
  