/**
 * Interfaz principal del modelo Empleado
 */
export interface Empleado {
  id: number;
  nombre: string;
  codEmpleado: string;
  email: string;
  edad: number;
  fechaAlta?: string;
  fechaBaja?: string | null;
}

/**
 * DTO para crear empleados
 */
export interface CreateEmpleadoDTO {
  nombre: string;
  codEmpleado: string;
  email: string;
  edad: number;
}

/**
 * DTO para actualizar empleados
 */
export interface UpdateEmpleadoDTO {
  nombre: string;
  codEmpleado: string;
  email: string;
  edad: number;
}

/**
 * Interfaz genérica para respuestas de la API
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

/**
 * Interfaz para errores de API
 */
export interface ApiError {
  status: number;
  message: string;
  details?: string;
}
