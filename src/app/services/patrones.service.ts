import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Patron, PatronDetailResponse, PatronesResponse } from '../models/patron.model';

@Injectable({
  providedIn: 'root'
})
export class PatronesService {

  private url = environment.apiBaseUrl + "/patrones";

  constructor(private http: HttpClient) {}

  createNewPtn(patron: Patron){
    return this.http.post<PatronDetailResponse>(this.url, patron); 
  }

  getAllPatrones(): Observable<PatronesResponse>{
    return this.http.get<PatronesResponse>(this.url); 
  }

  getPatronById(id: number): Observable<PatronDetailResponse> {
    return this.http.get<PatronDetailResponse>(`${this.url}/${id}`);
  }

  deletePatron(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  updatePatron(id: number, patron: Patron) {
    return this.http.put<PatronDetailResponse>(`${this.url}/${id}`, patron);
  }

}
