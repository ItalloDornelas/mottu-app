import { createAction, props } from '@ngrx/store';
import { Character } from '../../../models/characters.interface';

export const selectFavorite = createAction(
  '[Select Favorite] Character',
  props<{ selected: Character }>()
);

export const addFavorite = createAction(
  '[Add Favorites] Character',
  props<{ favorite: Character }>()
);

export const removeFavorite = createAction(
  '[Remove Favorite] Character',
  props<{ favorite: Character }>()
);
