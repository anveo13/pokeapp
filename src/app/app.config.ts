import { provideRouter, Routes, RouteReuseStrategy } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { IonicRouteStrategy } from '@ionic/angular';

import { HomePage } from './home/home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'pages/pokemon-detail/:name',
    loadComponent: () =>
      import('./pages/pokemon-detail/pokemon-detail.page').then(
        (m) => m.PokemonDetailPage
      ),
  },
];

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
};
