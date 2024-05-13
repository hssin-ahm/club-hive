import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinanceService } from '../../../services/finance.service'; // replace with the actual path to your FinanceService
import { TransactionType } from '../../../models/Finance.model' // replace with the actual path to your Finance model
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-finance-create',
  templateUrl: './finance-create.component.html',
  styleUrls: ['./finance-create.component.css'],

})
export class FinanceCreateComponent implements OnInit {
  financeForm: FormGroup;
  transactionTypes = Object.values(TransactionType);
  clubid: number;
  message: string;
  isError: boolean = false;
  constructor(private fb: FormBuilder,
     private financeService: FinanceService,
      private router:ActivatedRoute) { }

  ngOnInit() {
    this.clubid = +localStorage.getItem('idClub');
    this.financeForm = this.fb.group({
     giver: [''],
     receiver: [''],
      amount: ['', [Validators.required]],
      transactionType: ['', Validators.required],
     description: [''],
     
    });
  }
  swal(){
    Swal.fire({
      position: 'top-end',
      title: 'Finance created successfully!',
      text: '',
      showConfirmButton: false,
      timer: 1500,
      icon: 'success'
    });
  }
  onSubmit() {
    if (this.financeForm.valid) {
      let finance = {
        ...this.financeForm.value,
        transactionDate: new Date(),
        club: { id: this.clubid }
      };
      this.financeService.addFinance(finance).subscribe(
        () => {
          this.message = 'Finance created successfully!';
          this.swal();
          this.isError = false;
        },
        error => {
          this.message = 'An error occurred: ' + error.message;
          this.isError = true;
        }
      );
    }
  }
}