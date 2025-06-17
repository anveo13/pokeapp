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
  filteredPokemons: any[] = [];
  favorites: any[] = [];

  searchTerm: string = '';
  selectedTypes: string[] = [];

  types: string[] = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting',
    'poison', 'ground', 'flying', 'psychic', 'bug', 'rock',
    'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ];

  currentPage: number = 0;
  itemsPerPage: number = 20;
  paginatedPokemons: any[] = [];

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    this.loadPokemons();
  }

  isFavorite(pokemon: any): boolean {
    return this.favorites.some(fav => fav.name === pokemon.name);
  }

  // Alterna o estado de favorito
  toggleFavorite(pokemon: any) {
    if (this.isFavorite(pokemon)) {
      this.favorites = this.favorites.filter(fav => fav.name !== pokemon.name);
    } else {
      this.favorites.push(pokemon);
    }
  }

  loadPokemons() {
    this.pokemonService.getPokemons(1000, 0).subscribe(response => {
      const results = response.results;

      results.forEach((pokemon: any) => {
        this.pokemonService.getPokemonDetails(pokemon.name).subscribe(details => {
          const poke = {
            name: pokemon.name,
            image: details.sprites.front_default,
            types: details.types.map(t => t.type.name)
          };
          this.pokemons.push(poke);

          // Atualiza filtro e paginação só após carregar todos (opcional)
          if (this.pokemons.length === results.length) {
            this.filteredPokemons = [...this.pokemons];
            this.updatePagination();
          }
        });
      });
    });
  }

  toggleType(type: string, event: any) {
    if (event.detail.checked) {
      if (!this.selectedTypes.includes(type)) {
        this.selectedTypes.push(type);
      }
    } else {
      this.selectedTypes = this.selectedTypes.filter(t => t !== type);
    }
    this.filterPokemons();
  }

  toggleAllTypes(event: any) {
    if (event.detail.checked) {
      this.selectedTypes = [];
      this.filterPokemons();
    }
  }

  filterPokemons() {
    const term = this.searchTerm.toLowerCase();

    this.filteredPokemons = this.pokemons.filter(p => {
      const matchesName = p.name.toLowerCase().includes(term);

      const matchesType = this.selectedTypes.length === 0 || this.selectedTypes.some(type => p.types.includes(type));

      return matchesName && matchesType;
    });

    this.currentPage = 0;
    this.updatePagination();
  }

  updatePagination() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedPokemons = this.filteredPokemons.slice(start, end);
  }

  nextPage() {
    const totalPages = Math.ceil(this.filteredPokemons.length / this.itemsPerPage);
    if (this.currentPage < totalPages - 1) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToDetails(name: string) {
    this.router.navigate(['/pages/pokemon-detail', name]);
  }
}
