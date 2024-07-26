import { Component, HostListener, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import {
  NgSwitch,
  NgSwitchDefault,
  NgSwitchCase,
  ViewportScroller,
} from '@angular/common';
import { environment } from 'src/environments/environment';
import { OAuthService, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { filter, tap } from 'rxjs';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { HttpClient } from '@angular/common/http';
import { ReferrerCodeCheck } from './insurance/insurance-overview/insurance-overview.component';
import { LayoutComponent } from './layout/layout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, RouterLink],
})
export class AppComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setOffset();
  }
  innerWidth = 0;
  title = 'get-started-open-banking-angular';
  private oauthService = inject(OAuthService);
  private idle = inject(Idle);
  private loggingOut = false;

  referrerName = '';
  referrerUrl = '';
  referrerCode = '';
  elementType: string = '';
  openBankingUrl = environment.openBanking.elementsURL + '/main.js';

  quoteAndBuyUrl = environment.insurance.quoteAndBuyURL + '/main.js';
  insuranceElementsUrl = environment.insurance.elementsURL + '/main.js';
  onboardingUrl = environment.onboarding.onboardingURL + '/main.js';
  vps = inject(ViewportScroller);
  httpClient = inject(HttpClient);
  router = inject(Router);

  ngOnInit() {
    this.setOffset();
    this.router.events
      .pipe(
        filter(
          (event: any) =>
            event instanceof NavigationEnd ||
            event.routerEvent instanceof NavigationEnd
        ),
        tap((event: any) => {
          if (!localStorage.getItem('elementType')) this.setDefaultReferrer();

          if (!event['url']) {
            event = event.routerEvent;
          }
          if (event['url'].includes('insurance')) {
            localStorage.setItem('elementType', 'insurance');
          }
          if (event['url'].includes('open-banking')) {
            localStorage.setItem('elementType', 'open-banking');
          }
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
        })
      )
      .subscribe();
  }

  setOffset() {
    this.innerWidth = window.innerWidth;

    if (this.innerWidth > 768) {
      this.vps.setOffset([0, 100]);
    } else {
      this.vps.setOffset([0, 150]);
    }
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

  setDefaultReferrer() {
    this.referrerCode = environment.insurance.demoSidebarCode;
    localStorage.setItem('elementType', 'insurance');

    if (this.referrerCode) {
      localStorage.setItem(
        'insuranceConfig',
        JSON.stringify({
          referrerId: this.referrerCode,
          basePath: 'angular/insurance/components/quote-and-buy',
          displayQuickQuote: false,
        })
      );
    }
    window.dispatchEvent(
      new CustomEvent('show-navigation', { detail: { show: true } })
    );

    localStorage.setItem('certua-sidebar', 'true');
    this.checkReferrer();
  }

  checkReferrer() {
    this.httpClient
      .get<ReferrerCodeCheck>(
        environment.uxAPIUrl + '/dfp/check-code/' + this.referrerCode
      )
      .subscribe((data) => {
        console.log('data', data);

        this.referrerName = data.name;
        this.referrerUrl = data.url;
        localStorage.setItem('certua-referrerName', this.referrerName);
        localStorage.setItem('certua-referrerUrl', this.referrerUrl);
      });
  }
}
