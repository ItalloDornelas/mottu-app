import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { charactersReducer } from './store/characters/all/characters.reducer';
import {
  favoriteSelectedReducer,
  favoritesReducer,
} from './store/characters/favorites/favorites.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      characters: charactersReducer,
      favorites: favoritesReducer,
      selected: favoriteSelectedReducer,
    }),
  ],
};
