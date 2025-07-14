import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { PatronesService } from '../../../../services/patrones.service';
import { Patron } from '../../../../models/patron.model';

@Component({
  selector: 'app-editar-patron',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar-patron.component.html',
  styleUrl: './editar-patron.component.css'
})
export class EditarPatronComponent {

  patronForm!: FormGroup;
  patronId!: number;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private patronesService: PatronesService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.patronId = Number(this.route.snapshot.paramMap.get('id'));
    this.patronesService.getPatronById(this.patronId).subscribe({
      next: res => {
        const patron: Patron = res.data;
        this.buildForm(patron);
        this.cargando = false;
      },
      error: err => {
        console.error('Error cargando el patrón:', err);
        this.cargando = false;
      }
    });
  }

  buildForm(patron: Patron): void {
    this.patronForm = this.fb.group({
      id: [],
      certificateNumber: [patron.certificateNumber, Validators.required],
      insType: [patron.insType, Validators.required],
      brand: [patron.brand],
      model: [patron.model],
      nameIdentify: [patron.nameIdentify],
      description: [patron.description],
      unit: [patron.unit],
      issueDate: [patron.issueDate, Validators.required],
      measurements: this.fb.array(patron.measurements.map(m => this.createMeasurementGroup(m)))
    });
  }

  createMeasurementGroup(m: any = {}): FormGroup {
    return this.fb.group({
      id: [m.id || null],
      reference: [m.reference || '', Validators.required],
      instrumentReading: [m.instrumentReading || '', Validators.required],
      correction: [m.correction || '', Validators.required],
      uncertainty: [m.uncertainty || '', Validators.required],
      ambientTemp: [m.ambientTemp || '', Validators.required]
    });
  }

  get measurements(): FormArray {
    return this.patronForm.get('measurements') as FormArray;
  }

  addMeasurement(): void {
    this.measurements.push(this.createMeasurementGroup());
  }

  removeMeasurement(index: number): void {
    this.measurements.removeAt(index);
  }

  submit(): void {
    if (this.patronForm.invalid) return;

    this.patronesService.updatePatron(this.patronId, this.patronForm.value).subscribe({
      next: () => this.router.navigate(['/conversor-project/mostrar-patron', this.patronId]),
      error: err => console.error('Error actualizando patrón:', err)
    });
  }
}
