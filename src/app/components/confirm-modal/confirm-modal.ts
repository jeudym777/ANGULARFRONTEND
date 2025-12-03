import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  imports: [CommonModule],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css',
})
export class ConfirmModal {
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  isVisible = false;
  title = '';
  message = '';
  confirmText = 'Confirmar';
  cancelText = 'Cancelar';

  show(options: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
  }): void {
    this.title = options.title;
    this.message = options.message;
    this.confirmText = options.confirmText || 'Confirmar';
    this.cancelText = options.cancelText || 'Cancelar';
    this.isVisible = true;
  }

  hide(): void {
    this.isVisible = false;
  }

  confirm(): void {
    this.onConfirm.emit();
    this.hide();
  }

  cancel(): void {
    this.onCancel.emit();
    this.hide();
  }
}
