import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConversorService } from '../../services/conversor.service';

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
  uniSalida: string = '';
  showResult: boolean = false;

  constructor(
    private fb: FormBuilder,
    private conversorService: ConversorService
  ) {
    this.forma = this.fb.group({
      sMagnitud: ['', Validators.required],
      uEntrada: ['', Validators.required],
      uSalida: ['', Validators.required],
      vEntrada: ['', Validators.required]
    });
  }

  magnitudChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.forma.patchValue({ vEntrada: '' });
    this.limpiarValoresSalida();
  
    this.conversorService.getUnidadesPorMagnitud(value).subscribe(resp => {
      this.unidades = resp;
    });
  }

  convertir(): void {
    if (this.forma.valid) {
      this.conversorService.getCambio(this.forma).subscribe(resp => {
        this.result = resp['resultado'];
      });
      this.uniSalida = this.forma.get('uSalida')?.value;
      this.showResult = true;
    } else {
      if (this.result !== 0) {
        this.limpiarValoresSalida();
      }
    }
  }

  resetForm(): void {
    this.forma.reset();
    this.uniSalida = '';
    this.limpiarValoresSalida();
  }

  limpiarValoresSalida(): void {
    this.result = 0;
    this.showResult = false;
  }
}
