import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from '../../services/score/score.service';

@Component({
  selector: 'app-lose',
  standalone: true,
  imports: [],
  templateUrl: './lose.component.html',
  styleUrl: './lose.component.scss'
})
export class LoseComponent {

  constructor(private router: Router) {}

  victories = inject(ScoreService);

  goToChoiceSelector() {
    this.victories.resetScore$();
    this.router.navigate(['/choice-selector']);
  }

}
