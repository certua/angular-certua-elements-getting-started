import { RouterLink } from '@angular/router';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-cashflow',
  standalone: true,
  imports: [CommonModule, NgIf, RouterLink],
  templateUrl: './cashflow.component.html',
  styleUrls: ['./cashflow.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CashflowComponent implements OnInit {
  showError = false;
  contextTokenOptions = '';
  ngOnInit() {
    if (!localStorage.getItem('apiConfig')) {
      this.showError = true;
    } else {
      this.contextTokenOptions = JSON.parse(
        localStorage.getItem('apiConfig') ?? ''
      );
    }
  }
}
