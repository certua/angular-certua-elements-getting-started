import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-token-error',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './no-token-error.component.html',
  styleUrls: ['./no-token-error.component.scss'],
})
export class NoTokenErrorComponent {}
