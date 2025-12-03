/**
 * Constantes de la aplicación
 */
export const APP_CONSTANTS = {
  ALERT: {
    DURATION: 3500,
    ANIMATION_DELAY: 10,
    FADE_OUT_DELAY: 300,
  },
  VALIDATION: {
    MIN_AGE: 16,
    MAX_AGE: 100,
    COD_EMPLEADO_MAX_LENGTH: 4,
  },
} as const;

/**
 * Mensajes de la aplicación
 */
export const MESSAGES = {
  SUCCESS: {
    CREATE: (nombre: string) => `Empleado "${nombre}" creado con éxito!`,
    UPDATE: 'Empleado actualizado con éxito!',
    DELETE: 'Empleado eliminado correctamente!',
  },
  ERROR: {
    LOAD: 'Error al cargar empleados',
    CREATE: 'Error al crear el empleado',
    UPDATE: 'Error al actualizar el empleado',
    DELETE: 'Error al eliminar el empleado',
    GENERIC: 'Ha ocurrido un error inesperado',
  },
  CONFIRM: {
    DELETE_TITLE: '⚠️ Confirmar Eliminación',
    DELETE_MESSAGE: '¿Estás seguro de que deseas eliminar este empleado? Esta acción no se puede deshacer.',
    DELETE_CONFIRM: 'Sí, Eliminar',
    DELETE_CANCEL: 'Cancelar',
  },
  EMPTY: {
    NO_EMPLEADOS: 'No hay empleados registrados',
    LOADING: 'Cargando empleados...',
  },
} as const;

/**
 * Configuración de la API
 */
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5010/api',
  ENDPOINTS: {
    EMPLEADOS: '/Empleados',
    EMPLEADO_BY_ID: (id: number) => `/Empleados/${id}`,
    EMPLEADO_BY_CODIGO: (codigo: string) => `/Empleados/${codigo}`,
  },
  TIMEOUT: 30000,
} as const;

/**
 * Códigos de estado HTTP
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
