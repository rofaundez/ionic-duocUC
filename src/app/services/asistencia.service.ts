import { Injectable } from '@angular/core';
import { Asistencia } from '../interfaces/asistencia'; // Asegúrate de ajustar la ruta

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  private asistencia: Asistencia | undefined;

  constructor() {}

  setAsistencia(asistencia: Asistencia): void {
    this.asistencia = asistencia;
  }

  getAsistencia(): Asistencia | undefined {
    return this.asistencia;
  }

  clearAsistencia(): void {
    this.asistencia = undefined;
  }
}