import { Routes } from '@angular/router';
import '@angular/compiler';
import { HomeComponent } from './pages/home/home.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((mod) => mod.HomeComponent),
  },
  {
    path: 'favorite',
    loadComponent: () =>
      import('./pages/favorite/favorite.component').then(
        (mod) => mod.FavoriteComponent
      ),
  },
];
