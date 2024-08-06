import { createReducer, on } from '@ngrx/store';
import { getCharacters } from './characters.actions';
import { Character } from '../../../models/characters.interface';

export const charactersState: { allCharacters: Character[] } = {
  allCharacters: [],
};

export const charactersReducer = createReducer(
  charactersState.allCharacters,
  on(getCharacters, (state, { allCharacters }): Character[] => allCharacters)
);
