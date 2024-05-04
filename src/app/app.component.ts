import { Component } from '@angular/core';
import { MovieCardComponent } from './movie-card/movie-card.component';

/**
 * @description App root Component.
 * @selector 'app-root'
 * @templateUrl './app.component.html'
 * @styleUrls [./app.component.scss']
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

/**
 * @constructor - Constructor for root AppComponent.
 * @param title {string} - App title or heading.
 */
export class AppComponent {
  title = 'myFlix-Angular-client';
}
