# 🚀 Sistema de Gestión de Empleados - Angular

Sistema CRUD completo de empleados desarrollado con **Angular 20**, con una interfaz moderna y responsive, conectado a un backend ASP.NET Core.

## ✨ Características

- ✅ **CRUD Completo**: Crear, Leer, Actualizar y Eliminar empleados
- ✅ **Formularios Reactivos**: Validación en tiempo real con Angular Reactive Forms
- ✅ **Interfaz Moderna**: Diseño responsivo con gradientes y animaciones
- ✅ **Notificaciones**: Alertas animadas de éxito/error
- ✅ **Arquitectura Limpia**: Componentes reutilizables y servicios HTTP
- ✅ **TypeScript**: Tipado fuerte para mayor seguridad
- ✅ **Zoneless**: Aplicación sin zone.js para mejor rendimiento

## 🛠️ Tecnologías

- **Frontend**: Angular 20.3.10
- **Lenguaje**: TypeScript
- **Formularios**: Reactive Forms
- **HTTP**: HttpClient
- **Backend**: ASP.NET Core 9.0 (C#)
- **Base de datos**: SQL Server
- **ORM**: Dapper

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- Angular CLI (v20 o superior)
- Backend ASP.NET Core corriendo en `http://localhost:5010`
- SQL Server con tabla `Empleados`

## 🔧 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/jeudym777/ANGULARFRONTEND.git

# Navegar al directorio
cd ANGULARFRONTEND/mi-proyecto-angular

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

## 📁 Estructura del Proyecto

```
src/app/
├── components/
│   ├── alert/                 # Componente de alertas
│   ├── empleado-form/         # Formulario de empleado
│   ├── empleado-tabla/        # Tabla de empleados
│   └── empleados-crud/        # Componente principal CRUD
├── constants/
│   └── app.constants.ts       # Constantes y mensajes
├── models/
│   └── empleado.interface.ts  # Interfaces y DTOs
├── services/
│   └── empleado.service.ts    # Servicio HTTP
└── app.ts                     # Componente raíz
```

## 🎯 Funcionalidades

### Crear Empleado
- Formulario con validación en tiempo real
- Campos: Nombre, Código, Email, Edad
- Validaciones personalizadas

### Listar Empleados
- Tabla responsive con diseño adaptable
- Formato de fechas localizado
- Acciones de editar y eliminar por empleado

### Actualizar Empleado
- Carga automática de datos en el formulario
- Campo de código deshabilitado en edición
- Actualización optimista con confirmación

### Eliminar Empleado
- Modal de confirmación
- Eliminación con notificación de éxito

## 🔌 API Endpoints

- `GET /api/Empleados` - Obtener todos los empleados
- `GET /api/Empleados/{codigo}` - Obtener empleado por código
- `POST /api/Empleados` - Crear nuevo empleado
- `PUT /api/Empleados/{id}` - Actualizar empleado
- `DELETE /api/Empleados/{codigo}` - Eliminar empleado

## 🎨 Características de la Interfaz

- **Diseño Responsive**: Adaptable a móviles, tablets y desktop
- **Gradientes Modernos**: Fondo con degradado púrpura
- **Animaciones**: Transiciones suaves en interacciones
- **Validación Visual**: Feedback inmediato en formularios
- **Notificaciones Toast**: Alertas no intrusivas
- **Tabla Responsiva**: Vista de cards en móviles

## 📱 Responsive Design

La aplicación se adapta perfectamente a diferentes tamaños de pantalla:

- **Desktop**: Tabla completa con todas las columnas
- **Tablet**: Grid de formulario optimizado
- **Mobile**: Vista de cards para la tabla, formulario en columna única

## 🚀 Comandos de Desarrollo

```bash
ng serve
```

```bash
# Servidor de desarrollo
ng serve

# Build de producción
ng build

# Ejecutar tests
ng test

# Lint
ng lint
```

## 🔐 Validaciones

### Formulario de Empleado
- **Nombre**: Requerido, mínimo 3 caracteres
- **Código**: Requerido, máximo 4 caracteres
- **Email**: Requerido, formato de email válido
- **Edad**: Requerido, entre 16 y 100 años

## 🌟 Mejoras Futuras

- [ ] Paginación de empleados
- [ ] Búsqueda y filtros
- [ ] Exportación a Excel/PDF
- [ ] Autenticación y autorización
- [ ] Modo oscuro
- [ ] Internacionalización (i18n)
- [ ] Tests unitarios y e2e

## 👤 Autor

**Jeudy Mejía**
- GitHub: [@jeudym777](https://github.com/jeudym777)
- Repositorio Backend: [EmpleadosBackend](https://github.com/jeudym777/EmpleadosBackend)
- Repositorio Frontend Original: [EmpleadosFrontEnd](https://github.com/jeudym777/EmpleadosFrontEnd)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

⭐ Si te gustó este proyecto, ¡dale una estrella en GitHub!

