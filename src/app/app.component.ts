import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { PokeapiService } from './services/pokeapi/pokeapi.service';
import { Pokemon } from './models/pokemon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'poke-quiz';
  private pokemonData = inject(PokeapiService);
  pokemon = signal<Pokemon | null>(null);
  error = signal(false);

  // Asignamos al pokemon resultante a la variable pokemon cada vez que se dibuja el componente
  ngOnInit() {
    this.pokemonData.getPokemon$().subscribe(data => {
      this.pokemon.set(data);
      this.error.set(data == null);
    });
  }

  // Este es el metodo que usamos en el html
  readPokemon(id: number) {
    this.pokemonData.readPokemon$(id);
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
