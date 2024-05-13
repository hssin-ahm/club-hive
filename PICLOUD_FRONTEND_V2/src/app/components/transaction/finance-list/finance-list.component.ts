import { Component, OnInit, TemplateRef } from '@angular/core';
import { FinanceService } from '../../../services/finance.service'; // replace with the actual path to your FinanceService
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FinanceCreateComponent} from '../finance-create/finance-create.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-finance-list',
  templateUrl: './finance-list.component.html',
  styleUrls: ['./finance-list.component.css']
})
export class FinanceListComponent implements OnInit {
  finances = [];
  clubid : number = 0;

  constructor(
    private financeService: FinanceService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.clubid = +localStorage.getItem('idClub');
    this.financeService.getFinanceByClubId(this.clubid).subscribe(finances => {
      this.finances = finances;
    });
    
  }
  reloadPage() {
    location.reload();
  }
  openLgModal(content: TemplateRef<any>) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
  }
  goToCreateFinance(): void {
    this.router.navigate(['apps/finance/create']);
  }
  deleteFinance(id: number) {
    this.financeService.deleteFinance(id).subscribe(() => {
      this.finances = this.finances.filter(finance => finance.id !== id);
    });
  }
  getTransactionTypeColor(transactionType: string) {
    switch (transactionType) {
      case 'DEBIT':
        return 'red';
      case 'CREDIT':
        return 'green';
      case 'TRANSFER':
        return 'blue';
      default:
        return 'transparent';
    }
  }
  calculateTreasuryValue() {
    let treasuryValue = 0;
  
    this.finances.forEach(finance => {
      switch (finance.transactionType) {
        case 'DEBIT':
          treasuryValue += finance.amount;
          break;
        case 'CREDIT':
          treasuryValue += finance.amount;
          break;
        case 'TRANSFER':
          // Modify this based on your business logic for TRANSFER
          break;
        default:
          break;
      }
    });
  
    return treasuryValue;
  }
}