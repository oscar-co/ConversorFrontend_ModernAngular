import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-measurement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './measurement.component.html',
  styleUrl: './measurement.component.css'
})
export class MeasurementComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Output() remove = new EventEmitter<void>();

  onRemove(): void {
    this.remove.emit();
  }

  ngOnInit() {
    console.log('Medición cargada:', this.formGroup.value);
  }
}
