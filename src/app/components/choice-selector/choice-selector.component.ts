import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { Router } from '@angular/router';
import { PokeapiService } from '../../services/pokeapi/pokeapi.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-choice-selector',
  standalone: true,
  imports: [],
  templateUrl: './choice-selector.component.html',
  styleUrl: './choice-selector.component.css'
})
export class ChoiceSelectorComponent implements OnInit{
  constructor(private router: Router) {}

  ngOnInit() {
    this.readPokemons();
  }

  private pokemonData = inject(PokeapiService);
  pokemon = signal<Pokemon | null>(null);
  pokemons = signal<Pokemon[]>([]);
  error = signal(false);

  readPokemons() {
    const randomIds = Array.from({ length: 4 }, () => this.getRandomNumber(1, 800));
    const pokemonObservables: Observable<Pokemon>[] = randomIds.map(id => this.pokemonData.readPokemons$(id)); // Aqui es donde almacenamos los observables. 1 por cada peticion que hemos hemos

    // Usamos forkJoin para esperar a que todas las solicitudes terminen y pasamos al signal pokemons los datos que hemos recogido en el pokemonObservables
    // (Podriamos usar tambien Promise.all y funcionaria igual)
    forkJoin(pokemonObservables).subscribe({
      next: (data: (Pokemon | null)[]) => {
        this.pokemons.set(data as Pokemon[]);
        this.error.set(false);
      },
      error: (err) => {
        console.error('Error: ', err);
        this.error.set(true);
      },
    });
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
