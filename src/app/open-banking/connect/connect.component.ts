import { Router, RouterLink } from '@angular/router';
import { JsonPipe, NgIf } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { add, parse, parseISO } from 'date-fns';
import { CommonInputsComponent } from '../common-inputs/common-inputs.component';
import { NoTokenErrorComponent } from '../no-token-error/no-token-error.component';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
  imports: [
    NgIf,
    RouterLink,
    JsonPipe,
    CommonInputsComponent,
    NoTokenErrorComponent,
  ],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConnectComponent implements OnInit {
  router = inject(Router);
  showError = false;
  redirectionConfig = {
    successUrl:
      window.location.origin +
      '/angular/components/connect?accountConnection=success',
    failureUrl:
      window.location.origin +
      '/angular/components/connect?accountConnection=failure',
    popup: false,
  };
  loaded = false;
  daasUrl = '';
  contextTokenOptions = '';

  contentOverrides = {
    'certua-ob-provider-permissions': {
      howWeAreUsingData: '<p>[Custom text about how you use data]</p>',
    },
    'certua-ob-manage-providers': {
      confirmDisconnect: {
        implicationOfRevocation:
          '<p>[Custom text about implications of revoke]</p>',
        whatHappens:
          '<p>[Custom text about what happens to data if they revoke] </p>',
        relink: '<p>[Custom text about ability to relink]</p>',
        confirm: '<p>[Custom text asking user to confirm]</p>',
        termsOfServiceLink: `<a href='#'>[Custom Link to Terms of service here]</a>`,
      },
      disconnectSuccess: {
        implicationOfRevocation:
          '<p>[Custom text about implications of revoke]</p>',
        whatHappens:
          '<p>[Custom text about what happens to data now account are disconnected]</p>',
      },
    },
  };

  ngOnInit() {
    if (localStorage.getItem('elementType') !== 'open-banking') {
      this.router.navigate(['/components/quote-and-buy']);
    }

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
