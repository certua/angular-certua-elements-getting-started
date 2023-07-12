import { NgIf } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export enum Step {
  AccessToken,
  ContextToken,
  Styles,
  DaasUrl,
  Success,
  Error,
}

@Component({
  selector: 'app-ob-setup',
  templateUrl: './ob-setup.component.html',
  styleUrls: ['./ob-setup.component.scss'],
  standalone: true,
  providers: [],
  imports: [NgIf, FormsModule, RouterModule],
})
export class ObSetupComponent {
  Step = Step;
  step = Step.AccessToken;

  username = 'daas_client';
  password = 'user';
  countryCode: 'UK' | 'AU' = 'UK';
  accessToken = '';
  userReference = '';
  contextToken = '';
  apiUrl = '';
  apiConfig = '';
  primaryColor = '#007fc6';
  secondaryColor = '';
  daasUrl = '';

  private http = inject(HttpClient);

  reset() {
    this.step = Step.AccessToken;
  }

  back(chosenStep: Step) {
    this.step = chosenStep;
  }

  getAccessToken() {
    const authUKUrl = environment.openBanking.UK.authURL;
    const authAUUrl = environment.openBanking.AU.authURL;

    const authUrl = this.countryCode === 'UK' ? authUKUrl : authAUUrl;
    const basicAuth = btoa(`${this.username}:${this.password}`);
    const body = new HttpParams().set('grant_type', 'client_credentials');
    let httpHeaders = new HttpHeaders()
      .set('authorization', `Basic ${basicAuth}`)
      .set('Content-Type', 'application/x-www-form-urlencoded');

    this.http
      .post(authUrl, body, { headers: httpHeaders })
      .pipe(
        map((response: any) => {
          this.accessToken = response.access_token;
          this.step = Step.ContextToken;
        })
      )
      .subscribe();
  }

  getContextToken() {
    const tokenAUUrl = environment.openBanking.AU.apiURL;
    const tokenUKUrl = environment.openBanking.UK.apiURL;

    const tokenUrl = this.countryCode === 'UK' ? tokenUKUrl : tokenAUUrl;
    let httpHeaders = new HttpHeaders().set(
      'authorization',
      `Bearer ${this.accessToken}`
    );

    let body = {
      'client.integration.datasource.preference': ['OpenBanking', 'Yodlee'],
      'client.integration.sub-tenant.reference':
        environment.openBanking.UK.subTenantReference,
      'client.integration.user.reference': this.userReference, // this is your reference for your client (end user),
      'client.integration.adviser.reference':
        environment.openBanking.UK.adviserReference, // this is the adviser reference for the sub-tenant
    } as any;
    if (this.countryCode == 'AU') {
      (body['client.integration.sub-tenant.reference'] =
        environment.openBanking.AU.subTenantReference), // this is your sub-tenant reference
        (body['client.integration.adviser.reference'] =
          environment.openBanking.AU.adviserReference); // this is the adviser reference for the sub-tenant
    }
    this.http
      .post(tokenUrl, body, { headers: httpHeaders })
      .pipe(
        tap((data: any) =>
          localStorage.setItem(
            'apiConfig',
            JSON.stringify({
              ownerId: this.userReference,
              contextToken: data.context_token,
              countryCode: this.countryCode,
              dateCreated: new Date(),
              link_metadata: data.link_metadata,
            })
          )
        ),
        tap(
          (_) => (this.apiConfig = <string>localStorage.getItem('apiConfig'))
        ),
        tap((_) => (this.step = Step.Styles))
      )
      .subscribe();
  }

  setStyles() {
    let root = document.documentElement;

    root.style.setProperty('--primary', this.primaryColor);
    root.style.setProperty('--secondary', this.secondaryColor);

    localStorage.setItem('--primary', this.primaryColor);
    localStorage.setItem('--secondary', this.secondaryColor);
    this.step = Step.DaasUrl;
  }

  setUrl() {
    if (!this.daasUrl) {
      this.useDefaultUrl();
    } else {
      localStorage.setItem('daasUrl', this.daasUrl);
      this.step = Step.Success;
    }
  }
  useDefaultUrl() {
    localStorage.removeItem('daasUrl');
    this.step = Step.Success;
  }

  startAgain() {
    localStorage.clear();
    this.step = Step.AccessToken;
  }
}
