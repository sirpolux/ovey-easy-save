import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants';
import { AuthService } from './auth-service';



@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = BASE_URL

  constructor() { }
}
