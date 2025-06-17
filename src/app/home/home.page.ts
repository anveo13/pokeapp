import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  pokemons: any[] = [];

  constructor(private pokemonService: PokemonService, private router: Router) {}
  

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.getPokemons(20, 0).subscribe(response => {
      const results = response.results;

      // Buscar detalhes de cada Pokémon para pegar imagem e outras infos
      results.forEach((pokemon: any) => {
        this.pokemonService.getPokemonDetails(pokemon.name).subscribe(details => {
          this.pokemons.push({
            name: pokemon.name,
            image: details.sprites.front_default
          });
        });
      });
    });
  }

  goToDetails(name: string) {
    this.router.navigate(['/pages/pokemon-detail', name]);
  }
}
