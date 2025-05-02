import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from '../conversor/formulario/formulario.component';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [CommonModule, FormularioComponent],
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent {}
