import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  imports: [CommonModule],
  standalone: true,
})
export class NotfoundComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() path: string = '';

  constructor(private _route: Router) {}

  public goToPage = (): void => {
    this._route.navigate([this.path]);
  };
}
