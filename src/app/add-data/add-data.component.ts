import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {DropDown, finance} from '../_appData';
import { ToastrService } from 'ngx-toastr';
import {financeService} from '../_services';
import {first } from 'rxjs/operators';


@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  AmountControl = new FormControl('');
  transactionTypeInput: string = '';
  transactionCommentInput: string = '';
  transactionAmountInput: number=0.00;
  transactionDateInput: string= '';
  maxDate: Date;

  transactionTypes: DropDown[] = [
    {value: 'I', text: 'Income'},
    {value: 'S', text: 'Spending'},
  ];

  constructor(private toastr: ToastrService, private finService : financeService) { 
    this.maxDate = new Date();
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    var financeData: finance = {
      TransactAmount: this.transactionAmountInput ,
      TransactType: this.transactionTypeInput,
      TransactComment: this.transactionCommentInput,
      TransactDate: this.transactionDateInput
    };
    if(financeData.TransactAmount > 0 && financeData.TransactType != ''&& financeData.TransactComment != ''&& financeData.TransactDate != '')
    {
      this.finService.saveTransaction(financeData).pipe(first()).subscribe(inc => {
        this.toastr.success(inc);
        this.transactionAmountInput = 0;
      this.transactionTypeInput= '';
      this.transactionCommentInput= '';
      this.transactionDateInput= '';
      });
    }
    else{
      this.toastr.error("Please select all inputs.");
    }
  }

}



