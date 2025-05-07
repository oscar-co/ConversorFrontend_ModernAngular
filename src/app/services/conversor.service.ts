import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Patron, PatronesResponse } from '../models/patron.model';
import { Observable } from 'rxjs';
import { IncertidumbreResponse } from '../models/incertidumbre-response.model';
import { CambioResponse } from '../models/cambio-response.model';
import { environment } from '../../environments/environment';
import { ConversionData } from '../models/conversion-data.model';
import { UncertaintyByPtnDTO } from '../models/uncertaintyByPtn.model';

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
      map(resp => resp.data.map(p => p.nameIdentify))
    );
  }

  /**
   * Devuelve resultado de conversión en función del formulario.
   */
  getCambio(forma: FormGroup): Observable<ConversionData> {
    return this.http.post<CambioResponse>(`${this.url}/cambio`, forma.value).pipe(
      map(resp => resp.data)
    );
  }

  /**
   * Devuelve la incertidumbre calculada en base al patrón y valor.
   */
  getIncertidumbrePorPatronYValor(formaPat: FormGroup): Observable<number> {
    const data: UncertaintyByPtnDTO = {
      inputUnit: formaPat.get('inputUnit')?.value,
      inputValue: formaPat.get('inputValue')?.value,
      nameIdentify: formaPat.get('patron')?.value
    };    
    
    return this.http.post<IncertidumbreResponse>(`${this.url}/incertidumbre-patron`, data).pipe(
      map(resp => resp.data)
    );
  }
}
