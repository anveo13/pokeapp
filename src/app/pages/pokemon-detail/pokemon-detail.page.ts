import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {
  pokemon: any;
  name: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name') || '';
    this.loadPokemon();
  }
  goBack() {
    this.location.back();
  }
  
  loadPokemon() {
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${this.name}`).subscribe(data => {
      this.pokemon = data;
    });
  }

  // Getters para facilitar uso no template e evitar lógica direta no HTML
  get typesText(): string {
    return this.pokemon?.types?.map((t: any) => t.type.name).join(', ') || '';
  }

  get abilitiesText(): string {
    return this.pokemon?.abilities?.map((a: any) => a.ability.name).join(', ') || '';
  }

  get statsText(): string {
    return this.pokemon?.stats?.map((s: any) => `${s.stat.name}: ${s.base_stat}`).join(', ') || '';
  }
}
