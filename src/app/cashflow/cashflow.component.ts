import { RouterLink } from '@angular/router';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { add, parseISO } from 'date-fns';

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
