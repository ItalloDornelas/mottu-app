import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Character } from '../../models/characters.interface';
import {
  removeFavorite,
  selectFavorite,
} from '../../store/characters/favorites/favorites.actions';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  imports: [CommonModule],
  standalone: true,
})
export class CardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() characterSelected: Character = {} as Character;
  @Input() isFavorite: boolean = false;
  @Input() imgPath: string = '';

  constructor(private _store: Store) {}

  public handleAddOrRemoveFavorite(): void {
    this._store.dispatch(selectFavorite({ selected: this.characterSelected }));
    if (this.characterSelected.isFavorite)
      this._store.dispatch(
        removeFavorite({ favorite: this.characterSelected })
      );
  }

  public limitTextLength = (text: string) => {
    return text.length > 20 ? `${text.substring(0, 18)}...` : text ? text : ' ';
  };
}
