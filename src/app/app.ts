import { Component, signal } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('urbanatestevisual');
}
