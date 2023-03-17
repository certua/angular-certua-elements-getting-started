import { RouterLink } from '@angular/router';
import { JsonPipe, NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
  imports: [NgIf, RouterLink, JsonPipe],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConnectComponent implements OnInit {
  showError = false;
  redirectionConfig = {
    successUrl: window.location.origin + '/connect?accountConnection=success',
    failureUrl: window.location.origin + '/connect?accountConnection=failure',
  };
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
    if (!localStorage.getItem('apiConfig')) {
      this.showError = true;
    } else {
      this.contextTokenOptions = JSON.parse(
        localStorage.getItem('apiConfig') ?? ''
      );
    }
  }
}
