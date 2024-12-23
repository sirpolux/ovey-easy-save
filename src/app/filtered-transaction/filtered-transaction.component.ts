import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-filtered-transactions',
  templateUrl: './filtered-transaction.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    MenuComponent
],
  styleUrls: ['./filtered-transaction.component.scss'],
})
export class FilteredTransactionComponent implements OnInit {
  transactions: any[] = [];
  clientId: number = 0;
  pagination: any = {};
  startDate: string = '';
  endDate: string = '';
  clientName:string='';
  clientBalance:string='';

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.clientId = +params['client_id']; // Get client_id from the route params
      this.fetchFilteredTransactions();
    });
  }

  fetchFilteredTransactions(page: number = 1): void {
    this.transactionService
      .fetchFilteredClientTransactions(this.clientId, page, this.startDate, this.endDate)
      .subscribe((response: any) => {
        this.transactions = response.data;
        this.pagination = response.pagination;
        this.clientName = response.client_name;
      });
  }

  // Handle page change
  changePage(page: number): void {
    this.fetchFilteredTransactions(page);
  }
}
