import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioPatronComponent } from './formularioPat/formulario-patron/formulario-patron.component';

@Component({
  selector: 'app-conversion-patron',
  standalone: true,
  imports: [CommonModule, FormularioPatronComponent],
  templateUrl: './conversion-patron.component.html',
  styleUrls: ['./conversion-patron.component.css']
})
export class ConversionPatronComponent {}
