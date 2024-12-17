import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {
  constructor(private router: Router) {}

  title = 'poke-quiz';

  goToChoiceSelector() {
    this.router.navigate(['/choice-selector']);
  }
}
