import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  // La variable http es para poder usar los metodos get, post, etc
  private http = inject(HttpClient);
  private url = 'https://pokeapi.co/api/v2';

  // Para leer varios pokemon. Devolvemos de la respuesta solo los valores que tenemos definidos en la interfaz
  readPokemons$(id: number):Observable<Pokemon> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
      map(apiResponse => ({
        id: apiResponse.id,
        name: apiResponse.name,
        types: apiResponse.types.map((typeEntry: any) => ({
          slot: typeEntry.slot,
          type: { name: typeEntry.type.name }
        })),
        sprites: {
          front_default: apiResponse.sprites.front_default,
          back_default: apiResponse.sprites.back_default,
        },
        cries: {
          latest: apiResponse.cries.latest,
        }
      }))
    );
  }
}
