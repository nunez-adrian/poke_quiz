import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from '../../services/score/score.service';
import confetti from 'canvas-confetti';
import { ShareButtons } from 'ngx-sharebuttons/buttons';

@Component({
  selector: 'app-victory',
  standalone: true,
  imports: [ShareButtons],
  templateUrl: './victory.component.html',
  styleUrl: './victory.component.scss'
})
export class VictoryComponent implements OnInit {
  constructor(private router: Router) {}

  victories = inject(ScoreService);

  // Cada vez que dibujamos este componente, sumamos uno a la victoria
  ngOnInit() {
    this.victories.setScore$();
    this.celebrate();
  }

  goToChoiceSelector() {
    this.router.navigate(['/choice-selector'], { skipLocationChange: true });
  }

  celebrate() {
    const duration = 3000;

    confetti({
      particleCount: 100,
      spread: 160,
      origin: { y: 0.6 },
    });

    // Clear confetti after a certain duration
    setTimeout(() => confetti.reset(), duration);
  }
}
