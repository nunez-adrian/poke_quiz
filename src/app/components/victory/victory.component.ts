import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-victory',
  standalone: true,
  imports: [],
  templateUrl: './victory.component.html',
  styleUrl: './victory.component.css'
})
export class VictoryComponent implements OnInit {
  constructor(private router: Router) {}

  victories = 0;

  ngOnInit() {
    localStorage.setItem('victories', Number(localStorage.getItem('victories')) + this.router.lastSuccessfulNavigation?.extras.state?.['victories']);
    this.victories = Number(localStorage.getItem('victories'));
  }

  goToChoiceSelector() {
    this.router.navigate(['/choice-selector']);
  }
}
