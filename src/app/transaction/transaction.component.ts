import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent {
  transactions: any[] = [];
  pagination: any;

  // Bound properties for form inputs
  search: string = '';
  sortBy: string = '';
  sortOrder: string = '';

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.fetchTransactions(); // Load transactions initially without filters
  }

  fetchTransactions(): void {
    // Create the params object dynamically
    const params = {
      search: this.search,       // From user input
      sort_by: this.sortBy,      // From user selection
      sort_order: this.sortOrder // From user selection
    };

    // Call the service with params
    this.transactionService.getTransactions(params).subscribe(
      (response) => {
        this.transactions = response.data; // Populate transactions data
        this.pagination = response.pagination; // Pagination metadata
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }

}
