import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from '../../services/score/score.service';

@Component({
  selector: 'app-victory',
  standalone: true,
  imports: [],
  templateUrl: './victory.component.html',
  styleUrl: './victory.component.css'
})
export class VictoryComponent implements OnInit {
  constructor(private router: Router) {}

  victories = inject(ScoreService);

  // Cada vez que dibujamos este componente, sumamos uno a la victoria
  ngOnInit() {
    this.victories.setScore$();
  }

  goToChoiceSelector() {
    this.router.navigate(['/choice-selector']);
  }
}
