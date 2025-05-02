import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConversorService } from '../../../services/conversor.service';
import { Patron } from '../../../models/patron.model';

@Component({
  selector: 'app-formulario-patron',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-patron.component.html',
  styleUrls: ['./formulario-patron.component.css']
})
export class FormularioPatronComponent {
  
  formaPat: FormGroup;

  constructor(
    private fb: FormBuilder,
    private conversorService: ConversorService
  ) {
    this.formaPat = this.fb.group({
      magnitud: ['', Validators.required],
      inputUnit: ['', Validators.required],
      inputValue: ['', Validators.required],
      // patron: ['']
    });
  }

  
  unidades: string[] = [];
  patrones: String[] = [];
  result: number = 0;
  incertidumbrePatron: number = 0;
  uniSalida: string = '';
  showResult = false;
  errorMessage = '';

  

  magnitudChange(event: Event): void {
    const magnitud = (event.target as HTMLSelectElement).value;
    this.formaPat.patchValue({
      vEntradaPat: '',
      patronPat: ''
    });
    this.showResult = false;
    this.errorMessage = '';

    this.conversorService.getUnidadesPorMagnitud(magnitud).subscribe(
      resp => this.unidades = resp
    );
  }

  convertir(): void {
    if (!this.formaPat.valid) return;
  
    this.conversorService.getPatronesPorMagnitudYUnidad(this.formaPat).subscribe({
      next: (nameIdentifyList: string[]) => {
        this.patrones = nameIdentifyList;
  
        if (nameIdentifyList.length === 0) {
          this.showResult = false;
          this.errorMessage = 'Fuera de rango';
          this.formaPat.patchValue({ patronPat: '' });
          return;
        }
  
        this.errorMessage = '';
        this.uniSalida = this.formaPat.get('inputUnit')?.value;
        this.calcularInc();
      },
      error: () => {
        this.showResult = false;
        this.errorMessage = 'Error al obtener los patrones';
      }
    });
  }
  

  calcularInc(): void {
    const control = this.formaPat.get('patronPat');
    const patron = control?.value;
  
    if (patron !== null && patron !== undefined && patron !== '') {
      this.conversorService.getIncertidumbrePorPatronYValor(this.formaPat).subscribe((valor: number) => {
        this.incertidumbrePatron = valor;
      });
  
      this.showResult = true;
    }
  }

  resetForm() {
    this.formaPat.reset();
    this.showResult = false;
    this.uniSalida = '';
  }
}
