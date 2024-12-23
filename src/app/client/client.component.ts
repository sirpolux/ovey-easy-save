import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MenuComponent } from "../menu/menu.component";


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterLink,
    MenuComponent
],
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  clients: any[] = [];
  search: string = '';
  sort_by: string = 'name';
  sort_order: string = 'asc';
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.clientService
      .getClients(this.search, this.sort_by, this.sort_order, this.currentPage)
      .subscribe((response: any) => {
        this.clients = response.data;
        this.totalPages = response.pagination.last_page;
      });
  }

  onSearch(): void {
    this.currentPage = 1; // Reset to first page
    this.fetchClients();
  }

  onSort(field: string): void {
    if (this.sort_by === field) {
      this.sort_order = this.sort_order === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort_by = field;
      this.sort_order = 'asc';
    }
    this.fetchClients();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchClients();
  }


  fetchTransactions(client_id: number): void {
    // Navigate to the filtered transaction page with client_id as a route parameter
    this.router.navigate(['/filtered-transactions'], {
      queryParams: { client_id }, // Pass the client_id as a query parameter
    });
  }





}
