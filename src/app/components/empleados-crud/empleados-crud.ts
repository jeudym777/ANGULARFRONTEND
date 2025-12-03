import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Empleado, CreateEmpleadoDTO, UpdateEmpleadoDTO } from '../../models/empleado.interface';
import { EmpleadoService } from '../../services/empleado.service';
import { EmpleadoTabla } from '../empleado-tabla/empleado-tabla';
import { EmpleadoForm } from '../empleado-form/empleado-form';
import { Alert } from '../alert/alert';
import { ConfirmModal } from '../confirm-modal/confirm-modal';
import { MESSAGES } from '../../constants/app.constants';

@Component({
  selector: 'app-empleados-crud',
  imports: [CommonModule, EmpleadoTabla, EmpleadoForm, Alert, ConfirmModal],
  templateUrl: './empleados-crud.html',
  styleUrl: './empleados-crud.css',
})
export class EmpleadosCrud implements OnInit {
  @ViewChild(Alert) alertComponent!: Alert;
  @ViewChild(EmpleadoForm) formComponent!: EmpleadoForm;
  @ViewChild(ConfirmModal) confirmModal!: ConfirmModal;

  empleados: Empleado[] = [];
  empleadoEditando: Empleado | null = null;
  cargando = false;
  empleadoAEliminar: string | null = null;
  readonly MESSAGES = MESSAGES;

  constructor(
    private empleadoService: EmpleadoService,
    private cdr: ChangeDetectorRef
  ) {}

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
    console.log('Datos originales del formulario:', data);

    // Intentar simular exactamente lo que funciona en PUT
    const createDTO = {
      nombre: data.nombre?.toString().trim() || '',
      codEmpleado: data.codEmpleado?.toString().trim() || '',
      email: data.email?.toString().trim() || '',
      edad: Number(data.edad) || 0
      // Backend genera fechaAlta automáticamente
    };

    console.log('DTO final a enviar:', JSON.stringify(createDTO, null, 2));

    this.empleadoService.createEmpleado(createDTO as CreateEmpleadoDTO).subscribe({
      next: (empleado) => {
        console.log('¡Empleado creado exitosamente!:', empleado);
        this.alertComponent.show(MESSAGES.SUCCESS.CREATE(data.nombre), 'success');
        // Diferir el reset para evitar NG0100
        setTimeout(() => {
          this.formComponent.resetForm();
          this.cargarEmpleados();
          // Forzar detección tras actualizar estado UI
          this.cdr.detectChanges();
        }, 0);
      },
      error: (error) => {
        console.error('Error completo:', error);
        console.error('Status:', error.status);
        console.error('Error body:', error.error);
        this.alertComponent.show(MESSAGES.ERROR.CREATE, 'error');
      }
    });
  }  /**
   * Actualiza un empleado existente
   */
  private actualizarEmpleado(data: UpdateEmpleadoDTO): void {
    if (!this.empleadoEditando) return;

    const empleadoId = this.empleadoEditando.id;
    const empleadoCodigo = this.empleadoEditando.codEmpleado;

    // Usar el código del empleado en edición
    const updateDTO: UpdateEmpleadoDTO = {
      ...data,
      codEmpleado: empleadoCodigo
      // Backend mantiene fechaAlta original
    };

    this.empleadoService.updateEmpleado(empleadoId, updateDTO).subscribe({
      next: () => {
        this.alertComponent.show(MESSAGES.SUCCESS.UPDATE, 'success');
        this.cargarEmpleados();
        this.cancelarEdicion();
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
    this.empleadoAEliminar = codigo;
    this.confirmModal.show({
      title: MESSAGES.CONFIRM.DELETE_TITLE,
      message: MESSAGES.CONFIRM.DELETE_MESSAGE,
      confirmText: MESSAGES.CONFIRM.DELETE_CONFIRM,
      cancelText: MESSAGES.CONFIRM.DELETE_CANCEL
    });
  }

  /**
   * Confirma la eliminación del empleado
   */
  confirmarEliminacion(): void {
    if (!this.empleadoAEliminar) return;

    this.empleadoService.deleteEmpleado(this.empleadoAEliminar).subscribe({
      next: () => {
        this.alertComponent.show(MESSAGES.SUCCESS.DELETE, 'success');
        this.cargarEmpleados();
        this.empleadoAEliminar = null;
      },
      error: (error) => {
        this.alertComponent.show(MESSAGES.ERROR.DELETE, 'error');
        console.error('Error al eliminar empleado:', error);
        this.empleadoAEliminar = null;
      }
    });
  }

  /**
   * Cancela la eliminación
   */
  cancelarEliminacion(): void {
    this.empleadoAEliminar = null;
  }

  /**
   * Cancela la edición y vuelve al modo creación
   */
  cancelarEdicion(): void {
    this.empleadoEditando = null;
    if (this.formComponent) {
      this.formComponent.resetForm();
    }
    this.cdr.detectChanges();
  }
}
