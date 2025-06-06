import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PatronesResponse } from '../models/patron.model';

@Injectable({
  providedIn: 'root'
})
export class PatronesService {

  private url = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getAllPatrones(): Observable<PatronesResponse>{
    return this.http.get<PatronesResponse>(this.url); 
  }

  getPatronById(id: String): Observable<PatronesResponse>{
    return this.http.get<PatronesResponse>(`${this.url}/${id}`); 
  }
}
