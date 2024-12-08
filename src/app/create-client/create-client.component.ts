import { Component } from '@angular/core';
import { ClientService } from '../services/client.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-client',
  standalone:true,
  imports:[
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './create-client.component.html',
})
export class CreateClientComponent {
  client = {
    name: '',
    card_no: '',
    address: '',
    phone_number: '',
  };

  successMessage = '';
  errorMessage = '';
  validationErrors: any = {};

  constructor(private clientService: ClientService) {}

  createClient(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.validationErrors = {};

    this.clientService.createClient(this.client).subscribe({
      next: (response) => {
        this.successMessage = 'Client created successfully!';
        this.client = {
          name: '',
          card_no: '',
          address: '',
          phone_number: '',
        };
        console.log(response);
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'An error occurred.';
        this.validationErrors = error.error.errors || {};
      },
    });
  }
}
