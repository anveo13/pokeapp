import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storageKey = 'favoritePokemons';

  constructor() {}

  getFavorites(): string[] {
    const favs = localStorage.getItem(this.storageKey);
    return favs ? JSON.parse(favs) : [];
  }

  isFavorite(name: string): boolean {
    const favs = this.getFavorites();
    return favs.includes(name);
  }

  addFavorite(name: string): void {
    const favs = this.getFavorites();
    if (!favs.includes(name)) {
      favs.push(name);
      localStorage.setItem(this.storageKey, JSON.stringify(favs));
    }
  }

  removeFavorite(name: string): void {
    let favs = this.getFavorites();
    favs = favs.filter(fav => fav !== name);
    localStorage.setItem(this.storageKey, JSON.stringify(favs));
  }

  toggleFavorite(name: string): void {
    if (this.isFavorite(name)) {
      this.removeFavorite(name);
    } else {
      this.addFavorite(name);
    }
  }
}
