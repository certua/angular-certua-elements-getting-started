import { FormsModule } from '@angular/forms';
import { environment } from './../../../environments/environment';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
export interface ReferrerCodeCheck {
  name: string;
  isSidebar: boolean;
}
@Component({
  selector: 'app-insurance-overview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './insurance-overview.component.html',
  styleUrls: ['./insurance-overview.component.scss'],
})
export class InsuranceOverviewComponent implements OnInit, AfterViewInit {
  @ViewChild('getStarted')
  getStartedElement!: ElementRef;
  @ViewChild('siteCode') siteCodeElement!: ElementRef;
  @ViewChild('theming') themingElement!: ElementRef;
  @ViewChild('productContent') productContentElement!: ElementRef;
  @ViewChild('security') securityElement!: ElementRef;
  @ViewChild('clientLibraries') clientLibrariesElement!: ElementRef;
  @ViewChild('components') componentsElement!: ElementRef;

  qnbLink: string = environment.insurance.quoteAndBuyURL + 'main.js';
  insuranceElementsLink: string = environment.insurance.elementsURL + 'main.js';
  qnbPolyfills: string = environment.insurance.quoteAndBuyURL + 'polyfills.js';
  insuranceElementsPolyfills: string =
    environment.insurance.elementsURL + 'polyfills.js';

  referrerCode = '';
  httpClient = inject(HttpClient);
  referrerSet = false;
  referrerName = '';
  isSidebar = false;
  public getStartedOffset: number = 0;
  public siteCodeOffset: number = 0;
  public themingOffset: number = 0;
  public productContentOffset: number = 0;
  public securityOffset: number = 0;
  public clientLibrariesOffset: number = 0;
  public componentsOffset: number = 0;
  @HostListener('window:scroll', ['$event'])
  checkOffsetTop() {
    let currentIndex = 0;
    if (
      window.pageYOffset >= this.getStartedOffset &&
      window.pageYOffset < this.siteCodeOffset
    ) {
      currentIndex = 1;
    } else if (
      window.pageYOffset >= this.siteCodeOffset &&
      window.pageYOffset < this.themingOffset
    ) {
      currentIndex = 2;
    } else if (
      window.pageYOffset >= this.themingOffset &&
      window.pageYOffset < this.productContentOffset
    ) {
      currentIndex = 3;
    } else if (
      window.pageYOffset >= this.productContentOffset &&
      window.pageYOffset < this.securityOffset
    ) {
      currentIndex = 4;
    } else if (
      window.pageYOffset >= this.securityOffset &&
      window.pageYOffset < this.clientLibrariesOffset
    ) {
      currentIndex = 5;
    } else if (
      window.pageYOffset >= this.clientLibrariesOffset &&
      window.pageYOffset < this.componentsOffset
    ) {
      currentIndex = 6;
    } else if (window.pageYOffset >= this.componentsOffset) {
      currentIndex = 7;
    } else {
      currentIndex = 0;
    }

    window.dispatchEvent(
      new CustomEvent('selected-index', {
        bubbles: true,
        composed: true,
        detail: { index: currentIndex },
      })
    );
  }
  ngOnInit() {
    let config = localStorage.getItem('insuranceConfig');
    if (!!config) {
      this.referrerSet = true;

      this.referrerName = localStorage.getItem('certua-referrerName') ?? '';
    }
  }

  ngAfterViewInit(): void {
    this.getStartedOffset = this.getStartedElement.nativeElement.offsetTop;
    this.siteCodeOffset = this.siteCodeElement.nativeElement.offsetTop;
    this.themingOffset = this.themingElement.nativeElement.offsetTop;
    this.productContentOffset =
      this.productContentElement.nativeElement.offsetTop;
    this.securityOffset = this.securityElement.nativeElement.offsetTop;
    this.clientLibrariesOffset =
      this.clientLibrariesElement.nativeElement.offsetTop;
    this.componentsOffset = this.componentsElement.nativeElement.offsetTop;
  }

  reset() {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('elementType', 'insurance');
    this.referrerSet = false;
    this.referrerName = '';
    this.isSidebar = false;
  }
  setReferrer(value?: string) {
    if (!!value) {
      this.referrerCode = value;
    }
    localStorage.clear();
    sessionStorage.clear();

    localStorage.setItem('elementType', 'insurance');

    localStorage.setItem(
      'insuranceConfig',
      JSON.stringify({
        referrerId: this.referrerCode,
        basePath: 'angular/components/quote-and-buy',
      })
    );

    localStorage.setItem('certua-sidebar', this.isSidebar.toString());
    localStorage.setItem('certua-referrerName', this.referrerName);

    this.referrerSet = true;
  }

  checkReferrer(set = false) {
    this.httpClient
      .get<ReferrerCodeCheck>(
        environment.uxAPIUrl + '/dfp/check-code/' + this.referrerCode
      )
      .subscribe((data) => {
        console.log('data', data);

        this.referrerName = data.name;
        this.isSidebar = data.isSidebar;

        if (set) {
          this.setReferrer(this.referrerCode);
        }
      });
  }
  setDefaultReferrer(sidebar = false) {
    if (sidebar) {
      this.referrerCode = environment.insurance.demoSidebarCode;
      this.checkReferrer(true);
    } else {
      this.referrerCode = environment.insurance.demoSiteCode;
      this.checkReferrer(true);
    }
  }
}
