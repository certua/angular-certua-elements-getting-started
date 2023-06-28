import { RouterLink } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { add, parseISO } from 'date-fns';
import { CommonInputsComponent } from '../common-inputs/common-inputs.component';
import { NoTokenErrorComponent } from '../no-token-error/no-token-error.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    RouterLink,
    CommonInputsComponent,
    NoTokenErrorComponent,
  ],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TransactionsComponent implements OnInit {
  showError = false;
  contextTokenOptions: any;
  loaded = false;
  daasUrl = '';
  ngOnInit() {
    if (!localStorage.getItem('apiConfig')) {
      this.showError = true;
    } else {
      this.checkExpiry();
      this.contextTokenOptions = JSON.parse(
        localStorage.getItem('apiConfig') ?? ''
      );
    }
    if (localStorage.getItem('daasUrl')) {
      this.daasUrl = localStorage.getItem('daasUrl') ?? '';
    }
    this.loaded = true;
  }

  checkExpiry() {
    let token = JSON.parse(localStorage.getItem('apiConfig') ?? '');
    let tokenCreation = parseISO(token.dateCreated);
    if (add(tokenCreation, { minutes: 30 }) <= new Date()) {
      this.showError = true;
      localStorage.removeItem('apiConfig');
    }

    let root = document.documentElement;
    if (!root.style.getPropertyValue('--primary')) {
      let primary = localStorage.getItem('--primary');
      root.style.setProperty('--primary', primary);

      let secondary = localStorage.getItem('--secondary');
      root.style.setProperty('--secondary', secondary);
    }
  }
}
