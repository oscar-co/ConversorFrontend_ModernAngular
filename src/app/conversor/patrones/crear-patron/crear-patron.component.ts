import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MeasurementComponent } from './measurement/measurement.component';
import { PatronesService } from '../../../services/patrones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-patron',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MeasurementComponent],
  templateUrl: './crear-patron.component.html',
  styleUrl: './crear-patron.component.css'
})
export class CrearPatronComponent {
  formCert: FormGroup;

  constructor(private fb: FormBuilder, private patronesService: PatronesService, private router: Router) {
    this.formCert = this.fb.group({
      certificateNumber: ['CERT-001', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      insType: ['Temperatura', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      brand: ['ThermoCo', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      model: ['TH-1234567', [Validators.required, Validators.minLength(2), Validators.maxLength(24)]],
      nameIdentify: ['PTN-001', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      description: ['Certificado de calibración de ejemplo', [Validators.minLength(4), Validators.maxLength(100)]],
      issueDate: ['2023-12-01', [Validators.required]],
      unit: ['°C', [Validators.required]],
      measurements: this.fb.array([] as FormGroup[])
    });


    // Datos de ejemplo
    this.addMeasurement({
      reference: 100.0,
      instrumentReading: 100.2,
      correction: -0.2,
      uncertainty: 0.1,
      ambientTemp: 30.5
    });

    this.addMeasurement({
      reference: 50.0,
      instrumentReading: 49.8,
      correction: 0.2,
      uncertainty: 0.15,
      ambientTemp: 22.4
    });
  }

  get measurements(): FormArray<FormGroup> {
    return this.formCert.get('measurements') as FormArray<FormGroup>;
  }

  addMeasurement(data?: any): void {
    const measurementForm = this.fb.group({
      reference: [data?.reference ?? null, Validators.required],
      instrumentReading: [data?.instrumentReading ?? null, Validators.required],
      correction: [data?.correction ?? null, Validators.required],
      uncertainty: [data?.uncertainty ?? null, Validators.required],
      ambientTemp: [data?.ambientTemp ?? null, Validators.required]
    });
    this.measurements.push(measurementForm);
  }

  removeMeasurement(index: number): void {
    this.measurements.removeAt(index);
  }

  submitForm(): void {
    if (this.formCert.valid) {
      this.patronesService.createNewPtn(this.formCert.value).subscribe({
        next: (res) => {
          const newId = res.data?.id;
          console.log('Certificado creado correctamente:', res);
          if (newId) {
          this.router.navigate(['/conversor-project/mostrar-patron', newId]);
        } else {
          console.warn('No se pudo obtener el ID del nuevo patrón');
        }
          // Redireccionar o limpiar formulario si quieres
        },
        error: (err) => {
          console.error('Error al crear el certificado:', err);
        }
      });
    } else {
      console.warn('Formulario inválido');
    }
  }
}
