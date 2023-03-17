import { NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  imports: [NgIf, FormsModule],
})
export class HomeComponent {
  Step = Step;
  step = Step.AccessToken;

  username = '';
  password = '';
  accessToken = '';
  userReference = '';
  contextToken = '';
  apiUrl = '';
  apiConfig = '';
  primaryColor = 'blue';
  secondaryColor = '';

  private http = inject(HttpClient);

  reset() {
    this.step = Step.AccessToken;
  }

  back(chosenStep: Step) {
    this.step = chosenStep;
  }

  getAccessToken() {
    const authUrl =
      'https://iqdevauth.certua.io/oauth/token?grant_type=client_credentials';
    //STAGING URL
    //const authUrl = 'https://iqstgauth.certua.io/oauth/token?grant_type=client_credentials'
    const basicAuth = btoa(`${this.username}:${this.password}`);
    let httpHeaders = new HttpHeaders().set(
      'authorization',
      `Basic ${basicAuth}`
    );

    this.http
      .post(authUrl, null, { headers: httpHeaders })
      .pipe(
        map((response: any) => {
          this.accessToken = response.access_token;
          this.step = Step.ContextToken;
        })
      )
      .subscribe();
  }

  getContextToken() {
    const tokenUrl = 'https://iqdevdaas.certua.io/app/token';

    let httpHeaders = new HttpHeaders().set(
      'authorization',
      `Bearer ${this.accessToken}`
    );

    const body = {
      'client.integration.datasource.preference': ['OpenBanking', 'Yodlee'],
      'client.integration.user.reference': this.userReference, // this is your reference for your client
    };
    this.http
      .post(tokenUrl, body, { headers: httpHeaders })
      .pipe(
        map((data: any) => (this.contextToken = data.context_token)),
        tap((token) =>
          localStorage.setItem(
            'apiConfig',
            JSON.stringify({
              ownerId: this.userReference,
              contextToken: token,
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
