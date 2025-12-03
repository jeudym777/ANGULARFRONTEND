import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Empleado, CreateEmpleadoDTO, UpdateEmpleadoDTO } from '../../models/empleado.interface';
import { EmpleadoService } from '../../services/empleado.service';
import { EmpleadoTabla } from '../empleado-tabla/empleado-tabla';
import { EmpleadoForm } from '../empleado-form/empleado-form';
import { Alert } from '../alert/alert';
import { MESSAGES } from '../../constants/app.constants';

@Component({
  selector: 'app-empleados-crud',
  imports: [CommonModule, EmpleadoTabla, EmpleadoForm, Alert],
  templateUrl: './empleados-crud.html',
  styleUrl: './empleados-crud.css',
})
export class EmpleadosCrud implements OnInit {
  @ViewChild(Alert) alertComponent!: Alert;
  @ViewChild(EmpleadoForm) formComponent!: EmpleadoForm;

  empleados: Empleado[] = [];
  empleadoEditando: Empleado | null = null;
  cargando = false;
  readonly MESSAGES = MESSAGES;

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  /**
   * Carga la lista de empleados desde la API
   */
  cargarEmpleados(): void {
    this.cargando = true;
    this.empleadoService.getEmpleados().subscribe({
      next: (empleados) => {
        this.empleados = empleados;
        this.cargando = false;
      },
      error: (error) => {
        this.alertComponent?.show(MESSAGES.ERROR.LOAD, 'error');
        console.error('Error al cargar empleados:', error);
        this.cargando = false;
      }
    });
  }

  /**
   * Maneja el envío del formulario
   */
  handleFormSubmit(data: CreateEmpleadoDTO | UpdateEmpleadoDTO): void {
    if (this.empleadoEditando) {
      this.actualizarEmpleado(data as UpdateEmpleadoDTO);
    } else {
      this.crearEmpleado(data as CreateEmpleadoDTO);
    }
  }

  /**
   * Crea un nuevo empleado
   */
  private crearEmpleado(data: CreateEmpleadoDTO): void {
    this.empleadoService.createEmpleado(data).subscribe({
      next: (empleado) => {
        this.alertComponent.show(MESSAGES.SUCCESS.CREATE(data.nombre), 'success');
        this.formComponent.resetForm();
        this.cargarEmpleados();
      },
      error: (error) => {
        this.alertComponent.show(MESSAGES.ERROR.CREATE, 'error');
        console.error('Error al crear empleado:', error);
      }
    });
  }

  /**
   * Actualiza un empleado existente
   */
  private actualizarEmpleado(data: UpdateEmpleadoDTO): void {
    if (!this.empleadoEditando) return;

    // Usar el código del empleado en edición
    const updateDTO: UpdateEmpleadoDTO = {
      ...data,
      codEmpleado: this.empleadoEditando.codEmpleado
    };

    this.empleadoService.updateEmpleado(this.empleadoEditando.id, updateDTO).subscribe({
      next: () => {
        this.alertComponent.show(MESSAGES.SUCCESS.UPDATE, 'success');
        this.cancelarEdicion();
        this.cargarEmpleados();
      },
      error: (error) => {
        this.alertComponent.show(MESSAGES.ERROR.UPDATE, 'error');
        console.error('Error al actualizar empleado:', error);
      }
    });
  }

  /**
   * Prepara el formulario para editar un empleado
   */
  editarEmpleado(id: number): void {
    this.empleadoEditando = this.empleados.find(e => e.id === id) || null;

    // Scroll al formulario
    setTimeout(() => {
      document.querySelector('.form-card')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  /**
   * Elimina un empleado
   */
  eliminarEmpleado(codigo: string): void {
    if (confirm(MESSAGES.CONFIRM.DELETE_MESSAGE)) {
      this.empleadoService.deleteEmpleado(codigo).subscribe({
        next: () => {
          this.alertComponent.show(MESSAGES.SUCCESS.DELETE, 'success');
          this.cargarEmpleados();
        },
        error: (error) => {
          this.alertComponent.show(MESSAGES.ERROR.DELETE, 'error');
          console.error('Error al eliminar empleado:', error);
        }
      });
    }
  }

  /**
   * Cancela la edición y vuelve al modo creación
   */
  cancelarEdicion(): void {
    this.empleadoEditando = null;
    this.formComponent.resetForm();
  }
}
