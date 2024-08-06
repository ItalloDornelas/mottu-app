import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  retry,
  startWith,
  switchMap,
} from 'rxjs';
import { CardComponent } from '../../components/card/card.component';
import { NotfoundComponent } from '../../components/notfound/notfound.component';
import { Character } from '../../models/characters.interface';
import { getCharacters } from '../../store/characters/all/characters.actions';
import {
  addFavorite,
  removeFavorite,
} from '../../store/characters/favorites/favorites.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    CardComponent,
    CommonModule,
    ReactiveFormsModule,
    NotfoundComponent,
  ],
  standalone: true,
})
export class HomeComponent {
  public notFoundTitle: string = 'Nada foi encontrado';
  public notFoundDescription: string = 'Tente realizar uma nova busca.';
  public characters: Character[] = [];
  public favorites: Character[] = [];

  public characters$: Observable<Character[]>;
  public favorites$: Observable<Character[]>;
  public selected$: Observable<Character>;

  constructor(
    private _http: HttpClient,
    private _store: Store<{
      characters: Character[];
      selected: Character;
      favorites: Character[];
    }>
  ) {
    this.getAllCharacters();
    this.selected$ = this._store.select('selected');
    this.characters$ = this._store.select('characters');
    this.favorites$ = this._store.select('favorites');

    this.characters$.subscribe((data) => {
      if (data.length) {
        this.characters = data;
      }
    });

    this.filterCharacter$.subscribe((data) => {
      const result = this.updateCharacterType(data);
      this.characters = result;
    });

    this.favorites$.subscribe((data) => {
      this.favorites = data;
    });

    this.selected$.subscribe((data) => {
      if (data.isFavorite) this.addOrRemoveFavorite(data);
      else this.addOrRemoveFavorite(data, true);
    });
  }

  public control = new FormControl<string>('', { nonNullable: true });

  public getAllCharacters = () => {
    if (!this.characters.length) {
      const response = this._http.get<{ results: Character[] }>(
        `https://rickandmortyapi.com/api/character`
      );
      response.subscribe((data) => {
        const results = this.updateCharacterType(data.results);
        this._store.dispatch(getCharacters({ allCharacters: results }));
      });
    }
  };

  public filterCharacter$ = this.control.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((search) => {
      return this._http.get<{ results: Character[] }>(
        `https://rickandmortyapi.com/api/character/?name=${search}`
      );
    }),
    map((search) => search.results),
    startWith([]),
    retry(),
    catchError(() => {
      return of([] as Character[]);
    })
  );

  public addOrRemoveFavorite = (data: Character, remove?: boolean) => {
    this.characters = this.characters.map((character) => {
      if (character.id === data.id) {
        const updatedCharacter = {
          ...character,
          isFavorite: data.isFavorite,
        };
        if (remove) {
          this._store.dispatch(removeFavorite({ favorite: data }));
        } else
          this._store.dispatch(addFavorite({ favorite: updatedCharacter }));
        return updatedCharacter;
      }
      return character;
    });
    this._store.dispatch(getCharacters({ allCharacters: this.characters }));
  };

  public updateCharacterType = (data: Character[]) => {
    const results = data.map((character) => {
      return {
        name: character.name,
        gender: character.gender,
        image: character.image,
        id: character.id,
        isFavorite: this.verifyIsFavorite(character),
      };
    });
    return results;
  };

  public verifyIsFavorite = (data: Character) => {
    if (this.favorites.length) {
      const favorites = this.favorites.filter(
        (favorite) => data.id === favorite.id
      );
      return favorites.length ? true : false;
    }
    return false;
  };
}
