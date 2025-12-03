import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreateEmpleadoDTO, UpdateEmpleadoDTO, Empleado } from '../../models/empleado.interface';
import { APP_CONSTANTS } from '../../constants/app.constants';

@Component({
  selector: 'app-empleado-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empleado-form.html',
  styleUrl: './empleado-form.css',
})
export class EmpleadoForm implements OnInit, OnChanges {
  @Input() empleadoEditando: Empleado | null = null;
  @Output() onSubmit = new EventEmitter<CreateEmpleadoDTO | UpdateEmpleadoDTO>();
  @Output() onCancel = new EventEmitter<void>();

  empleadoForm!: FormGroup;
  readonly APP_CONSTANTS = APP_CONSTANTS;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['empleadoEditando'] && this.empleadoForm) {
      if (this.empleadoEditando) {
        this.cargarDatosEmpleado();
      } else {
        this.resetForm();
      }
    }
  }

  /**
   * Inicializa el formulario reactivo
   */
  private initForm(): void {
    this.empleadoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      codEmpleado: ['', [
        Validators.required,
        Validators.maxLength(APP_CONSTANTS.VALIDATION.COD_EMPLEADO_MAX_LENGTH)
      ]],
      email: ['', [Validators.required, Validators.email]],
      edad: ['', [
        Validators.required,
        Validators.min(APP_CONSTANTS.VALIDATION.MIN_AGE),
        Validators.max(APP_CONSTANTS.VALIDATION.MAX_AGE)
      ]]
    });
  }

  /**
   * Carga datos del empleado en el formulario
   */
  private cargarDatosEmpleado(): void {
    if (this.empleadoEditando) {
      this.empleadoForm.patchValue({
        nombre: this.empleadoEditando.nombre,
        codEmpleado: this.empleadoEditando.codEmpleado,
        email: this.empleadoEditando.email,
        edad: this.empleadoEditando.edad
      });

      // Deshabilitar el campo de código en modo edición
      this.empleadoForm.get('codEmpleado')?.disable();
    }
  }

  /**
   * Resetea el formulario
   */
  resetForm(): void {
    this.empleadoForm.reset();
    this.empleadoForm.get('codEmpleado')?.enable();
  }

  /**
   * Maneja el envío del formulario
   */
  submitForm(): void {
    if (this.empleadoForm.valid) {
      const formValue = this.empleadoForm.getRawValue(); // getRawValue incluye campos deshabilitados
      this.onSubmit.emit(formValue);
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.empleadoForm.controls).forEach(key => {
        this.empleadoForm.get(key)?.markAsTouched();
      });
    }
  }

  /**
   * Cancela la edición
   */
  cancelar(): void {
    this.onCancel.emit();
  }

  /**
   * Verifica si un campo tiene errores
   */
  hasError(field: string, error: string): boolean {
    const control = this.empleadoForm.get(field);
    return !!(control && control.hasError(error) && control.touched);
  }

  /**
   * Verifica si el formulario está en modo edición
   */
  get isEditMode(): boolean {
    return !!this.empleadoEditando;
  }
}
