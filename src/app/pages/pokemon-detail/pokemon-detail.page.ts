import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

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
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name') || '';
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${this.name}`).subscribe(data => {
      this.pokemon = data;
    });
  }
}
