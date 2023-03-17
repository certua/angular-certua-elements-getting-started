import { RouterLink } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, NgIf, RouterLink],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TransactionsComponent {
  showError = false;
}
