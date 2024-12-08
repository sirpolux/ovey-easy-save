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
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  createClient(payload: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(this.apiUrl, payload, { headers }).pipe(
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
    });
  }

  fetchClientTransactions(client_id: number): Observable<any> {
    return this.http.get(`${BASE_URL}/transactions/client`, {
      headers: this.getHeaders(),
      params: new HttpParams().set('client_id', client_id.toString()),
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
    });
  }

  
}
