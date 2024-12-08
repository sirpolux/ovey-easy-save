import { Component } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-capture-transaction',
  standalone:true,
  imports:[
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './capture-transaction.component.html',
})
export class CaptureTransactionComponent {
  transaction = {
    amount: null,
    card_no: '',
    transaction_type: '',
    purpose: 'weekly contribution',
  };

  clientName: string | null = null;
  errorMessage = '';
  successMessage = '';
  balance: number | null = null;

  constructor(private transactionService: TransactionService) {}

  onCardNoChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Cast EventTarget to HTMLInputElement
    const cardNo = inputElement.value;
    console.log('Card Number:', cardNo);

    if (cardNo) {
      this.transactionService.getClientByCardNo(cardNo).subscribe({
        next: (response) => {
          if (response.status) {
            this.clientName = response.name;
          } else {
            this.errorMessage = response.msg;
          }
        },
        error: () => {
          this.errorMessage = 'An error occurred while fetching client details.';
        },
      });
    }
  }

  submitTransaction(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.balance = null;

    this.transactionService.recordTransaction(this.transaction).subscribe({
      next: (response) => {
        this.successMessage = `Transaction successful for ${response.name}`;
        this.balance = response.balance;
        this.transaction = {
          amount: null,
          card_no: '',
          transaction_type: '',
          purpose: 'weekly contribution',
        };
        this.clientName = null;
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = error.error.msg;
        } else {
          this.errorMessage = 'An error occurred during the transaction.';
        }
      },
    });
  }
}
