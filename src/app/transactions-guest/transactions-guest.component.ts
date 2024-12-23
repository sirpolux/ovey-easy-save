// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-transactions-guest',
//   standalone: true,
//   imports: [],
//   templateUrl: './transactions-guest.component.html',
//   styleUrl: './transactions-guest.component.scss'
// })
// export class TransactionsGuestComponent {

// }

import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Route, Router, RouterLink } from '@angular/router';
import { MenuComponent } from "../menu/menu.component";
import { UnAuthenticatedMenuComponent } from "../un-authenticated-menu/un-authenticated-menu.component";

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterLink,
    MenuComponent,
    UnAuthenticatedMenuComponent
],

  templateUrl: './transactions-guest.component.html',
  styleUrl: './transactions-guest.component.scss'
})
export class TransactionsGuestComponent {
  transactions: any[] = [];
  pagination: any;

  // Bound properties for form inputs
  search: string = '';
  sortBy: string = '';
  sortOrder: string = '';
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.fetchTransactions(); // Load transactions initially without filters
  }

  fetchTransactions(): void {
    // Create the params object dynamically
    const params = {
      search: this.search,       // From user input
      sort_by: this.sortBy,      // From user selection
      sort_order: this.sortOrder, // From user selection
      page:this.currentPage
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

  changePage(page: number): void {
    console.log(page);
    this.currentPage = page;
    this.fetchTransactions();
  }


}
