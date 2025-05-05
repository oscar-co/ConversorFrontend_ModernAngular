import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConversorService } from '../../services/conversor.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  forma: FormGroup;

  unidades: string[] = [];
  result: number = 0;
  showResult: boolean = false;
  resultFormatted: string = '';

  constructor(
    private fb: FormBuilder,
    private conversorService: ConversorService
  ) {
    this.forma = this.fb.group({
      magnitud: ['', Validators.required],
      inputUnit: ['', Validators.required],
      outputUnit: ['', Validators.required],
      inputValue: ['', Validators.required]
    });
  }

  magnitudChange(event: Event): void {

    const value = (event.target as HTMLSelectElement).value;
    //const magnitud = this.forma.get('magnitud')?.value;
    this.unidades = [];

    this.forma.reset({
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
    if (this.forma.valid) {
      this.conversorService.getCambio(this.forma).subscribe(resp => {
        this.result = Number(resp.outputValue.toPrecision(2));
        this.resultFormatted = this.result.toLocaleString('es-ES', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 10
        });

        this.showResult = true;
      });
    } else {
      if (this.result !== 0) {
        this.limpiarValoresSalida();
      }
    }
  }

  resetForm(): void {
    this.forma.reset();
    this.limpiarValoresSalida();
  }

  limpiarValoresSalida(): void {
    this.result = 0;
    this.showResult = false;
  }

  copiarResultado(): void {
    navigator.clipboard.writeText('El resultado es: ' + this.resultFormatted + ' ' + this.forma.get('outputUnit')?.value || '').then(() => {
      const toastEl = document.getElementById('copyToast');
      if (toastEl) {
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
      }
    });
  }
}
