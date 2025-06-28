import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { ConversorService } from '../../../../../services/conversor.service';

@Component({
  selector: 'app-formulario-patron',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-patron.component.html',
  styleUrls: ['./formulario-patron.component.css']
})
export class FormularioPatronComponent {
  
  formaPat: FormGroup;
  resultFormatted: string = '';

  constructor(
    private fb: FormBuilder,
    private conversorService: ConversorService
  ) {
    this.formaPat = this.fb.group({
      magnitud: ['', Validators.required],
      inputUnit: ['', Validators.required],
      inputValue: ['', Validators.required],
      patron: ['']
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

    const value = (event.target as HTMLSelectElement).value;
    this.unidades = [];

    this.formaPat.reset({
      magnitud: value,
      inputUnit: '',
      outputUnit: '',
      inputValue: ''
    });
    this.limpiarValoresSalida();
  
    this.conversorService.getUnidadesPorMagnitud(value).subscribe(resp => {
      this.unidades = resp;
    });
  }

  convertir(): void {
    const inputValue = this.formaPat.get('inputValue')?.value;

    if (!inputValue) {
      this.patrones = [];
      this.formaPat.patchValue({ patron: '' });
      this.limpiarValoresSalidaConservUnits();
      return;
    }
    if (!this.formaPat.valid) return;

    this.conversorService.getPatronesPorMagnitudYUnidad(this.formaPat).subscribe({
      next: (nameIdentifyList: string[]) => {
        this.patrones = nameIdentifyList;
  
        if (nameIdentifyList.length === 0) {
          this.showResult = false;
          this.errorMessage = 'Fuera de rango';
          this.formaPat.patchValue({ patron: '' });
          return;
        }
  
        this.errorMessage = '';
        this.uniSalida = this.formaPat.get('inputUnit')?.value;
        this.calcularInc();
      },
      error: () => {
        this.showResult = true;
        this.errorMessage = 'Error al obtener los patrones';
      }
    });
  }

  calcularInc(): void {
    const patron = this.formaPat.get('patron')?.value;
          console.log("Forma pat", this.formaPat);

    if (patron !== null && patron !== undefined && patron !== '') {
      this.conversorService.getIncertidumbrePorPatronYValor(this.formaPat).subscribe((valor: number) => {
        this.incertidumbrePatron = valor;
        this.result = Number(this.incertidumbrePatron.toPrecision(2));
        this.resultFormatted = this.result.toLocaleString('es-ES', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 10
        });
      });
      this.showResult = true;
    }
  }

  limpiarValoresSalida(): void {
    this.result = 0;
    this.showResult = false;
    this.errorMessage = '';
    this.unidades = [];
    this.patrones = [];
  }

  limpiarValoresSalidaConservUnits(): void {
    this.result = 0;
    this.showResult = false;
    this.errorMessage = '';
    this.patrones = [];
  }

  resetForm() {
    this.formaPat.reset();
    //this.showResult = false;
    this.uniSalida = '';
    this.limpiarValoresSalida();
  }

  copiarResultado(): void {
      navigator.clipboard.writeText('El resultado es: ' + this.incertidumbrePatron + ' ' + this.uniSalida || '').then(() => {
        const toastEl = document.getElementById('copyToast');
        if (toastEl) {
          const toast = new bootstrap.Toast(toastEl);
          toast.show();
        }
      });
    }
}
