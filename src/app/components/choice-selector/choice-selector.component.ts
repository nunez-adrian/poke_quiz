import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { Router } from '@angular/router';
import { PokeapiService } from '../../services/pokeapi/pokeapi.service';
import { forkJoin, Observable } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-choice-selector',
  standalone: true,
  imports: [NgClass],
  templateUrl: './choice-selector.component.html',
  styleUrl: './choice-selector.component.scss'
})
export class ChoiceSelectorComponent implements OnInit{

  constructor(private router: Router) {}

  // Cargamos todos los pokemon cada vez que dibujamos este componente
  ngOnInit() {
    this.readPokemons();
  }

  pokemonData = inject(PokeapiService); // Inyectamos el servicio de pokeapi
  pokemon = signal<Pokemon | null>(null); // Aqui almacenamos al pokemon elegido
  pokemons = signal<Pokemon[]>([]); // Aqui todos los que hemos leido
  error = signal(false);
  noChoice = false;
  selectedPokemon: number | null = null; // Almacena el id del pokemon seleccionado por el usuario

  /**
   * Lee los datos de 4 pokemons aleatorios y los almacena en la variable pokemons
   */
  readPokemons() {
    const randomIds = Array.from({ length: 4 }, () => this.getRandomNumber(1, 151));
    const pokemonObservables: Observable<Pokemon>[] = randomIds.map(id => this.pokemonData.readPokemons$(id));

    // Usamos forkJoin para esperar a que todas las solicitudes terminen y pasamos al signal los datos que hemos recogido en el pokemonObservables
    forkJoin(pokemonObservables).subscribe({
      next: (data: (Pokemon | null)[]) => {
        this.pokemons.set(data as Pokemon[]);
        this.error.set(false);

        // Ya tenemos a todos los pokemons, ahora vamos a elegir un pokemon al azar y cogemos el audio de ese pokemon
        const randomIndex = this.getRandomNumber(0, 3);
        this.pokemon.set(this.pokemons()[randomIndex]);
      },
      error: (err) => {
        console.error('Error: ', err);
        this.error.set(true);
      },
    });
  }

  /**
   * Almacena al pokemon elegido en la variable para posteriormente compararlo
   * 
   * @param pokemon 
   * @returns 
   */
  onSelectPokemon(pokemon: number) {
    if (this.selectedPokemon === pokemon) {
      this.selectedPokemon = null;
      return;
    }

    this.selectedPokemon = pokemon;
  }

  /**
   * Comprueba el resultado de la elección del usuario. Si el usuario acierta, vamos a la pantalla de victoria. Si no, a la de derrota
   * Si no se elegió ningún pokemon, mostramos un error
   * 
   * @returns
   */
  checkResult() {
    if (this.selectedPokemon === null) {
      this.noChoice = true;

      // Elimina el error automáticamente después de la animación. el setTimeout dura lo mismo que la animacion
      setTimeout(() => {
        this.noChoice = false;
      }, 400);

      return;
    }

    if (this.selectedPokemon === this.pokemon()?.id) {
      this.router.navigate(['/victory'], { state: { victories: 1 }, skipLocationChange: true });
    } else {
      this.router.navigate(['/lose'], { skipLocationChange: true });
    }
  }

  /**
   * Recibe dos valores y devuelve un numero aleatorio entre esos dos valores
   * 
   * @param min 
   * @param max 
   * @returns number
   */
  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
