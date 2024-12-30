import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';
import { BASE_URL } from '../constants';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private apiUrl = `${BASE_URL}/clients`;
  // private getHeaders(): HttpHeaders {
  //   const token = this.authService.getToken();
  //   // Get the XSRF-TOKEN cookie value
  //   const xsrfToken = this.getCookie('XSRF-TOKEN');
  //   return new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //     'Content-Type': 'application/json',

  //   });
  // }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();

    // Get the XSRF-TOKEN cookie value
    const xsrfToken = this.getCookie('XSRF-TOKEN');

    const headersConfig: { [header: string]: string } = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'

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

  createClient(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload, { headers:this.getHeaders(), withCredentials:true }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  

  getClients(search: string, sort_by: string, sort_order: string, page: number): Observable<any> {
    let params = new HttpParams()
      .set('search', search || '')
      .set('sort_by', sort_by || 'name')
      .set('sort_order', sort_order || 'asc')
      .set('page', page.toString());

    return this.http.get(`${BASE_URL}/clients`, {
      headers: this.getHeaders(), 
      params,
      withCredentials:true
    });
  }

  fetchClientTransactions(client_id: number): Observable<any> {
    return this.http.get(`${BASE_URL}/transactions/client`, {
      headers: this.getHeaders(),
      params: new HttpParams().set('client_id', client_id.toString()),
      withCredentials:true
    });
  }

  fetchFilteredClientTransactions(client_id: number, page: number, startFrom?: string, endAt?: string): Observable<any> {
    let params = new HttpParams()
      .set('client_id', client_id.toString())
      .set('page', page.toString());
  
    if (startFrom) {
      params = params.set('startFrom', startFrom);
    }
    if (endAt) {
      params = params.set('endAt', endAt);
    }
  
    return this.http.get(`${BASE_URL}/transactions/client`, {
      headers: this.getHeaders(),
      params,
      withCredentials:true
    });
  }

  
}
