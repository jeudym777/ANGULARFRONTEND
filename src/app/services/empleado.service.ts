import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Empleado, CreateEmpleadoDTO, UpdateEmpleadoDTO, ApiError } from '../models/empleado.interface';
import { API_CONFIG, HTTP_STATUS } from '../constants/app.constants';

/**
 * Servicio para gestionar las operaciones de empleados con la API
 */
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private readonly baseUrl = API_CONFIG.BASE_URL;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los empleados
   */
  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.baseUrl}${API_CONFIG.ENDPOINTS.EMPLEADOS}`)
      .pipe(
        catchError(error => this.handleError(error, 'Error al cargar la lista de empleados'))
      );
  }

  /**
   * Obtiene un empleado por código
   */
  getEmpleadoByCodigo(codigo: string): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.baseUrl}${API_CONFIG.ENDPOINTS.EMPLEADO_BY_CODIGO(codigo)}`)
      .pipe(
        catchError(error => this.handleError(error, 'Empleado no encontrado'))
      );
  }

  /**
   * Crea un nuevo empleado
   */
  createEmpleado(empleadoDTO: CreateEmpleadoDTO): Observable<Empleado> {
    return this.http.post<Empleado>(`${this.baseUrl}${API_CONFIG.ENDPOINTS.EMPLEADOS}`, empleadoDTO)
      .pipe(
        catchError(error => this.handleError(error, 'Error al crear el empleado'))
      );
  }

  /**
   * Actualiza un empleado existente
   */
  updateEmpleado(id: number, empleadoDTO: UpdateEmpleadoDTO): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.baseUrl}${API_CONFIG.ENDPOINTS.EMPLEADO_BY_ID(id)}`, empleadoDTO)
      .pipe(
        catchError(error => this.handleError(error, 'Error al actualizar el empleado'))
      );
  }

  /**
   * Elimina un empleado (soft delete)
   */
  deleteEmpleado(codigo: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${API_CONFIG.ENDPOINTS.EMPLEADO_BY_CODIGO(codigo)}`)
      .pipe(
        catchError(error => this.handleError(error, 'Error al eliminar el empleado'))
      );
  }

  /**
   * Maneja errores y los convierte en mensajes legibles
   */
  private handleError(error: HttpErrorResponse, defaultMessage: string): Observable<never> {
    let errorMessage = defaultMessage;

    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = this.getErrorDetails(error.status);
    }

    const apiError: ApiError = {
      status: error.status,
      message: errorMessage,
      details: error.message
    };

    return throwError(() => apiError);
  }

  /**
   * Obtiene detalles del error según el código de estado HTTP
   */
  private getErrorDetails(status: number): string {
    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
        return 'Los datos enviados no son válidos';
      case HTTP_STATUS.UNAUTHORIZED:
        return 'No autorizado';
      case HTTP_STATUS.FORBIDDEN:
        return 'Acceso prohibido';
      case HTTP_STATUS.NOT_FOUND:
        return 'Recurso no encontrado';
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        return 'Error interno del servidor';
      default:
        return 'Error desconocido';
    }
  }
}
