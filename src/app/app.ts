import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmpleadosCrud } from './components/empleados-crud/empleados-crud';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmpleadosCrud],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Sistema de Gestión de Empleados';
}
