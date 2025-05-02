import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Patron, PatronesResponse } from '../models/patron.model';
import { Observable } from 'rxjs';
import { IncertidumbreResponse } from '../models/incertidumbre-response.model';
import { CambioResponse } from '../models/cambio-response.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  private http = inject(HttpClient);
  private url = environment.apiBaseUrl;

  /**
   * Devuelve las unidades disponibles según la magnitud.
   */
  getUnidadesPorMagnitud(magnitud: string) {
    return this.http.get<any>(`${this.url}/unidades/${magnitud}`).pipe(
      map(resp => resp.data)
    );
  }

  /**
   * Devuelve patrones de cálculo en función de la forma enviada.
   */
  getPatronesPorMagnitudYUnidad(formaPat: FormGroup): Observable<string[]> {
    return this.http.post<PatronesResponse>(`${this.url}/patrones-disponibles`, formaPat.value).pipe(
      map(resp => resp.data.map(p => p.nameIdentify)) // <- aquí extraes solo nameIdentify
    );
  }

  /**
   * Devuelve resultado de conversión en función del formulario.
   */
  getCambio(forma: FormGroup): Observable<CambioResponse> {
    const json = JSON.stringify(forma.value);
    const params = `json=${json}`;
    return this.http.post<CambioResponse>(`${this.url}/cambio`, params, httpOptions);
  }

  /**
   * Devuelve la incertidumbre calculada en base al patrón y valor.
   */
  getIncertidumbrePorPatronYValor(formaPat: FormGroup): Observable<number> {
    const json = JSON.stringify(formaPat.value);
    const params = `json=${json}`;
    return this.http.post<IncertidumbreResponse>(`${this.url}/incertidumbre-patron`, params, httpOptions).pipe(
      map(resp => resp.data) // Solo extraemos el número
    );
  }
}
