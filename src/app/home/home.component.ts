import { NgIf } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { map, tap } from 'rxjs';

export enum Step {
  AccessToken,
  ContextToken,
  Styles,
  Success,
  Error,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  providers: [],
  imports: [NgIf, FormsModule, RouterModule],
})
export class HomeComponent {
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

  private http = inject(HttpClient);

  reset() {
    this.step = Step.AccessToken;
  }

  back(chosenStep: Step) {
    this.step = chosenStep;
  }

  getAccessToken() {
    // const authUrl =
    //   'https://iqdevauth.certua.io/oauth/token?grant_type=client_credentials';
    //STAGING URL
    const authUKUrl =
      'https://identitydev.certua.io/realms/Certua/protocol/openid-connect/token';
    const authAUUrl =
      'https://identitydev-au.certua.io/realms/Certua/protocol/openid-connect/token';
    // UK 'https://identitydev.certua.io/oauth/token?grant_type=client_credentials';
    //STAGING URL
    //const authUrl =
    //  'https://iqstgauth.certua.io/oauth/token?grant_type=client_credentials';
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
    const tokenAUUrl = 'https://apidev-au.certua.io/daas/app/token';
    const tokenUKUrl = 'https://apidev.certua.io/daas/app/token';

    //STG
    //const tokenUrl = 'https://apistg.certua.io/daas/app/token';

    const tokenUrl = this.countryCode === 'UK' ? tokenUKUrl : tokenAUUrl;
    let httpHeaders = new HttpHeaders().set(
      'authorization',
      `Bearer ${this.accessToken}`
    );

    const body = {
      'client.integration.datasource.preference': ['OpenBanking', 'Yodlee'],
      'client.integration.user.reference': this.userReference, // this is your reference for your client,
      'client.integration.user.sub-tenant.reference': '12499',
      'client.integration.adviser.reference': '9163',
    };
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
    this.step = Step.Success;
  }
}
