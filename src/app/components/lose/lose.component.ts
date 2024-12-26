import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from '../../services/score/score.service';

@Component({
  selector: 'app-lose',
  templateUrl: './lose.component.html',
  styleUrls: ['./lose.component.css']
})
export class LoseComponent implements OnInit {

  constructor(private router: Router) {}

  victories = inject(ScoreService);

  ngOnInit() {
    this.victories.resetScore$();
  }

  goToChoiceSelector() {
    this.router.navigate(['/choice-selector']);
  }

}
