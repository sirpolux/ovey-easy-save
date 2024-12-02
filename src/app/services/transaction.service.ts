import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = BASE_URL;
  //private token = '3|wRfP2p6C4cClvbK0FOKv0aQY0QRyjcll9Wap9TB92b71dbc2';

  constructor(private http: HttpClient, private authService:AuthService) {}

  getTransactions(params: any): Observable<any> {
    // Set Authorization header with Bearer token
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Build query parameters dynamically
    let queryParams = new HttpParams();
    if (params.search) queryParams = queryParams.append('search', params.search);
    if (params.sort_by) queryParams = queryParams.append('sort_by', params.sort_by);
    if (params.sort_order) queryParams = queryParams.append('sort_order', params.sort_order);

    // Make GET request with headers and query params
    return this.http.get<any>(`${this.apiUrl}/transactions`, { headers, params: queryParams });
  }
}
