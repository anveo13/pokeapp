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

currentPage = 0;
limit = 20;

loadPokemons() {
  const offset = this.currentPage * this.limit;
  this.pokemons = []; // limpa a lista ao trocar de página

  this.pokemonService.getPokemons(this.limit, offset).subscribe(response => {
    const results = response.results;

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

nextPage() {
  this.currentPage++;
  this.loadPokemons();
}

previousPage() {
  if (this.currentPage > 0) {
    this.currentPage--;
    this.loadPokemons();
  }
}


  goToDetails(name: string) {
    this.router.navigate(['/pages/pokemon-detail', name]);
  }
}
