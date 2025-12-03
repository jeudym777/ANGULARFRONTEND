import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Empleado } from '../../models/empleado.interface';
import { MESSAGES } from '../../constants/app.constants';

@Component({
  selector: 'app-empleado-tabla',
  imports: [CommonModule],
  templateUrl: './empleado-tabla.html',
  styleUrl: './empleado-tabla.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmpleadoTabla {
  @Input() empleados: Empleado[] = [];
  @Output() onEdit = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<string>();

  readonly MESSAGES = MESSAGES;

  /**
   * Emite evento de edición
   */
  editarEmpleado(id: number): void {
    this.onEdit.emit(id);
  }

  /**
   * Emite evento de eliminación
   */
  eliminarEmpleado(codigo: string): void {
    this.onDelete.emit(codigo);
  }

  /**
   * Formatea la fecha al formato local
   */
  formatearFecha(fecha?: string): string {
    if (!fecha) return '-';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES');
  }
}
