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

  // Method to get headers with Bearer token and X-XSRF-TOKEN
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();

    // Get the XSRF-TOKEN cookie value
    const xsrfToken = this.getCookie('XSRF-TOKEN');

    const headersConfig: { [header: string]: string } = {
      Authorization: `Bearer ${token}`,
    };

    // Add X-XSRF-TOKEN header if XSRF-TOKEN exists
    if (xsrfToken) {
      headersConfig['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
    }

    return new HttpHeaders(headersConfig);
  }

  // Utility to get cookie value
  private getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) {
        return value;
      }
    }
    return null;
  }

  getTransactions(params: any): Observable<any> {
    const headers = this.getHeaders();

    // Build query parameters dynamically
    let queryParams = new HttpParams();
    if (params.search) queryParams = queryParams.append('search', params.search);
    if (params.sort_by) queryParams = queryParams.append('sort_by', params.sort_by);
    if (params.sort_order) queryParams = queryParams.append('sort_order', params.sort_order);
    if (params.page) queryParams = queryParams.append('page', params.page);

    // Make GET request with headers and query params
    return this.http.get<any>(`${this.apiUrl}/transactions`, {
      headers,
      params: queryParams,
      withCredentials: true,
    });
  }

  fetchFilteredClientTransactions(
    client_id: number,
    page: number,
    startFrom?: string,
    endAt?: string
  ): Observable<any> {
    const headers = this.getHeaders();

    // Build query parameters dynamically
    let params = new HttpParams()
      .set('client_id', client_id.toString())
      .set('page', page.toString());

    if (startFrom) params = params.set('startFrom', startFrom);
    if (endAt) params = params.set('endAt', endAt);

    // Make GET request with headers and query params
    return this.http.get<any>(`${this.apiUrl}/transactions/client`, {
      headers,
      params,
      withCredentials: true,
    });
  }

  recordTransaction(payload: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http
      .post<any>(`${this.apiUrl}/transactions/card-no`, payload, {
        headers,
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  getClientByCardNo(card_no: string): Observable<any> {
    const headers = this.getHeaders();

    return this.http
      .get<any>(`${BASE_URL}/clients/client-no/${card_no}`, {
        headers,
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
