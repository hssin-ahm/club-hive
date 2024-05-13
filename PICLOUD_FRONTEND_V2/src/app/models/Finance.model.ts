import { Club } from './club.model'; // replace with the actual path to your Club model

export enum TransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
  TRANSFER = 'TRANSFER'
}

export class Finance {
  id: number;
  giver: string;
  receiver: string;
  amount: number;
  transactionType: TransactionType;
  transactionDate: Date;
  description: string;
  club: Club;
  constructor(id: number, giver: string,receiver: string, amount: number, transactionType: TransactionType, transactionDate: Date, description: string, club: Club) {
    this.id = id;
    this.giver = giver;
    this.receiver = receiver;
    this.amount = amount;
    this.transactionType = transactionType;
    this.transactionDate = transactionDate;
    this.description = description;
    this.club = club;
  }
}