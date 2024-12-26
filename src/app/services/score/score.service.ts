import { Injectable } from '@angular/core';

// Servicio totalmente innecesario para sumar +1 o resetear el contador de victorias, pero queda más limpio y asi practico un poco más
@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  /**
   * Suma +1 al contador de victorias
   */
  setScore$() {
    localStorage.setItem('victories', (Number(localStorage.getItem('victories')) + 1).toString());
  }

  /**
   * Resetea el contador de victorias
   */
  resetScore$() {
    localStorage.setItem('victories', (0).toString());
  }

  /**
   * Devuelve el contador de victorias
   * 
   * @returns string
   */
  getScore$() {
    return localStorage.getItem('victories');
  }
}
