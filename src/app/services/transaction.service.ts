import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants';
import { AuthService } from './auth-service';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = BASE_URL;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Method to get headers with Bearer token
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getTransactions(params: any): Observable<any> {
    const headers = this.getHeaders();

    // Build query parameters dynamically
    let queryParams = new HttpParams();
    if (params.search) queryParams = queryParams.append('search', params.search);
    if (params.sort_by) queryParams = queryParams.append('sort_by', params.sort_by);
    if (params.sort_order) queryParams = queryParams.append('sort_order', params.sort_order);
    if(params.page) queryParams= queryParams.append('page',params.page);

    // Make GET request with headers and query params
    return this.http.get<any>(`${this.apiUrl}/transactions`, { headers, params: queryParams });
  }

  fetchFilteredClientTransactions(client_id: number, page: number, startFrom?: string, endAt?: string): Observable<any> {
    const headers = this.getHeaders();

    // Build query parameters dynamically
    let params = new HttpParams()
      .set('client_id', client_id.toString())
      .set('page', page.toString());

    if (startFrom) params = params.set('startFrom', startFrom);
    if (endAt) params = params.set('endAt', endAt);

    // Make GET request with headers and query params
    return this.http.get<any>(`${this.apiUrl}/transactions/client`, { headers, params });
  }

  recordTransaction(payload: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.apiUrl}/transactions/card-no`, payload, { headers }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getClientByCardNo(card_no: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${BASE_URL}/clients/client-no/${card_no}`, { headers }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }


}
