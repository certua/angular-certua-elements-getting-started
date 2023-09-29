import { Router, RouterLink } from '@angular/router';
import { JsonPipe, NgIf } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  inject,
  NgZone,
  OnInit,
} from '@angular/core';
import { add, parseISO } from 'date-fns';
import { InjectSetupWrapper } from '@angular/core/testing';
import { InsuranceCommonInputsComponent } from '../insurance-common-inputs/common-inputs.component';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-policies-list',
  templateUrl: './policies-list.component.html',
  styleUrls: ['./policies-list.component.scss'],
  standalone: true,
  imports: [NgIf, RouterLink, JsonPipe, InsuranceCommonInputsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PoliciesListComponent implements OnInit {
  accessToken: any;
  config: any;
  showError = false;
  router = inject(Router);
  loaded = false;
  clientId = '';
  organisationId = '';
  private oauthService = inject(OAuthService);

  ngOnInit() {
    if (!localStorage.getItem('elementType')) {
      this.router.navigate(['/home']);
    } else if (localStorage.getItem('elementType') == 'open-banking') {
      this.router.navigate(['/components/connect']);
    }

    let configJson = localStorage.getItem('insuranceConfig');

    if (!!configJson) {
      this.config = JSON.parse(configJson);
    }

    this.accessToken = this.oauthService.getAccessToken();

    let loggedInUser = localStorage.getItem('certua-loggedInUser') ?? '';
    if (!!loggedInUser) {
      this.clientId = JSON.parse(loggedInUser).clientId;
      this.organisationId = JSON.parse(loggedInUser).organisationId;
    }

    this.loaded = true;
  }

  viewPolicy(value: any) {
    this.router.navigate([`/components/view-policy2/${value.detail.id}`]);
  }
}
