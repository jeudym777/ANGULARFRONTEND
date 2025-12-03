import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_CONSTANTS } from '../../constants/app.constants';

export type AlertType = 'success' | 'error';

export interface AlertMessage {
  mensaje: string;
  tipo: AlertType;
  id: number;
}

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  alertas: AlertMessage[] = [];
  private alertIdCounter = 0;

  /**
   * Muestra una nueva alerta
   */
  show(mensaje: string, tipo: AlertType = 'success'): void {
    const alerta: AlertMessage = {
      mensaje,
      tipo,
      id: this.alertIdCounter++
    };

    this.alertas.push(alerta);

    // Auto-ocultar después del tiempo configurado
    setTimeout(() => {
      this.removeAlerta(alerta.id);
    }, APP_CONSTANTS.ALERT.DURATION);
  }

  /**
   * Remueve una alerta específica
   */
  removeAlerta(id: number): void {
    this.alertas = this.alertas.filter(a => a.id !== id);
  }

  /**
   * Limpia todas las alertas
   */
  clear(): void {
    this.alertas = [];
  }

  /**
   * Obtiene el icono según el tipo
   */
  getIcon(tipo: AlertType): string {
    return tipo === 'success' ? '✅' : '❌';
  }
}
