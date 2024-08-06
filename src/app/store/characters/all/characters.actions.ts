import { createAction, props } from '@ngrx/store';
import { Character } from '../../../models/characters.interface';

export const getCharacters = createAction(
  '[All Characters] Characters',
  props<{ allCharacters: Character[] }>()
);
