import { createReducer, on } from '@ngrx/store';
import { Character } from '../../../models/characters.interface';
import {
  addFavorite,
  selectFavorite,
  removeFavorite,
} from './favorites.actions';

export const favoritesState: Character[] = [] as Character[];

export const selectCharacterState: Character = {
  name: '',
  gender: '',
  image: '',
  id: 0,
  isFavorite: false,
} as Character;

export const favoriteSelectedReducer = createReducer(
  selectCharacterState,
  on(selectFavorite, (state, { selected }) => {
    return {
      name: selected.name,
      gender: selected.gender,
      image: selected.image,
      id: selected.id,
      isFavorite: !selected.isFavorite,
    };
  })
);

export const favoritesReducer = createReducer(
  favoritesState,
  on(addFavorite, (state, { favorite }): Character[] => {
    const filtered = state.filter((character) => character.id !== favorite.id);
    return [...filtered, favorite];
  }),
  on(removeFavorite, (state, { favorite }): Character[] => {
    return state.filter((character) => character.id !== favorite.id);
  })
);
