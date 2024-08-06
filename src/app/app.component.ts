import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { HomeComponent } from './pages/home/home.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HomeComponent,
    NavbarComponent,
    FavoriteComponent,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styles: [
    ':host {width:100%; min-height: 100vh; display: block; background: #1F1F1F;}',
  ],
})
export class AppComponent {
  title = 'mottu-app';
}
