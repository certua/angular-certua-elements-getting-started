import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-token-error',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './no-token-error.component.html',
  styleUrls: ['./no-token-error.component.scss'],
})
export class NoTokenErrorComponent {}
