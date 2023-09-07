import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  NgSwitch,
  NgSwitchDefault,
  NgSwitchCase,
  ViewportScroller,
} from '@angular/common';
import { environment } from 'src/environments/environment';
import { OAuthService, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { filter } from 'rxjs';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgSwitch, NgSwitchDefault, NgSwitchCase, RouterOutlet, RouterLink],
})
export class AppComponent implements OnInit {
  title = 'get-started-open-banking-angular';
  private oauthService = inject(OAuthService);
  private idle = inject(Idle);
  private loggingOut = false;
  elementType: string = '';
  openBankingUrl = environment.openBanking.elementsURL + '/main.js';

  quoteAndBuyUrl = environment.insurance.quoteAndBuyURL + '/main.js';
  insuranceElementsUrl = environment.insurance.elementsURL + '/main.js';
  onboardingUrl = environment.onboarding.onboardingURL + '/main.js';
  vps = inject(ViewportScroller);
  ngOnInit() {
    this.vps.setOffset([0, 100]);
    let type = localStorage.getItem('elementType');
    if (!!type) {
      this.elementType = type;

      if (type == 'open-banking') {
        this.loadScript(this.openBankingUrl, null);
      } else {
        this.loadScript(this.quoteAndBuyUrl, null);
        this.loadScript(this.insuranceElementsUrl, null);
      }
    }
    //this.setupSecurity();
  }
  private async loadScript(url: string, onload: any) {
    const componentJS = document.createElement('script');
    componentJS.async = true;
    componentJS.defer = true;
    componentJS.src = url;
    componentJS.type = 'module';
    //componentJS.src = url + `?v=${this._initialCacheDate.toString()}`;
    componentJS.onload = onload;
    document.head.appendChild(componentJS);
  }
}
