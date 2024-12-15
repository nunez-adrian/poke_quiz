import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  // La variable http es para poder usar los metodos get, post, etc
  private http = inject(HttpClient);
  private url = 'https://pokeapi.co/api/v2';

  private pokemon$ = new Subject<Pokemon | null>();

  // Este metodo es el que usaremos en el componente para suscribirnos al observable
  getPokemon$() {
    return this.pokemon$;
  }


  // Hacemos la peticion al endpoint de la pokeapi
  readPokemon$(id: number):void {
    this.http.get<Pokemon | null>(`${this.url}/pokemon/${id}`).subscribe({
      next: pokemon => this.pokemon$.next(pokemon),
      error: () => this.pokemon$.next(null),
      complete: () => {}
    });
  }
}
