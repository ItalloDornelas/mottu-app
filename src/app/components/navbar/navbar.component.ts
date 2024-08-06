import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Character } from '../../models/characters.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule],
  standalone: true,
  styles: [':host {display: block; background: #0A0A0A }'],
})
export class NavbarComponent {
  public isFavorite: boolean = false;
  public isHome: boolean = false;
  public count: number = 0;

  public favorites$: Observable<Character[]>;

  constructor(
    private _route: Router,
    private _store: Store<{ favorites: Character[] }>
  ) {
    this._route.events.subscribe(() => {
      this.isHome = this._route.url.toString() === '/' ? true : false;
      this.isFavorite =
        this._route.url.toString() === '/favorite' ? true : false;
    });

    this.favorites$ = this._store.select('favorites');

    this.favorites$.subscribe((characters) => {
      this.count = characters.length;
    });
  }

  public toggleHomePage(): void {
    this._route.navigate(['']);
    this.isHome = true;
    this.isFavorite = false;
  }
  public toggleFavoritePage(): void {
    this._route.navigate(['favorite']);
    this.isFavorite = true;
    this.isHome = false;
  }
}
