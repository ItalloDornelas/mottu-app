import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NotfoundComponent } from '../../components/notfound/notfound.component';
import { Character } from '../../models/characters.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  imports: [NotfoundComponent, CommonModule, CardComponent],
  standalone: true,
})
export class FavoriteComponent {
  public favorites: Character[] = [];
  public notFoundTitle: string = 'Parece que você ainda não tem favoritos';
  public notFoundDescription: string =
    'Volte à página inicial e escolha os melhores para você.';
  public notFoundPath: string = '/';

  public favorites$: Observable<Character[]>;

  constructor(private _store: Store<{ favorites: Character[] }>) {
    this.favorites$ = this._store.select('favorites');

    this.favorites$.subscribe((characters) => {
      this.favorites = characters;
    });
  }
}
