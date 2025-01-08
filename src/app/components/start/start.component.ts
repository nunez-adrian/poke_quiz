import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from '../../services/score/score.service';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {
  constructor(private router: Router) {}

  title = 'poke-quiz';
  score = inject(ScoreService);
  victories = Number(this.score.getScore$());

  goToChoiceSelector() {
    this.router.navigate(['/choice-selector'], {
      skipLocationChange: true
    });
  }
}
