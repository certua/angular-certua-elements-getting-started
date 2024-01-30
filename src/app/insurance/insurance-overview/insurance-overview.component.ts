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
import { Title } from '@angular/platform-browser';
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
  @ViewChild('introduction')
  introductionElement!: ElementRef;
  @ViewChild('getStarted')
  getStartedElement!: ElementRef;
  @ViewChild('siteCode') siteCodeElement!: ElementRef;
  @ViewChild('theming') themingElement!: ElementRef;

  @ViewChild('security') securityElement!: ElementRef;
  @ViewChild('clientLibraries') clientLibrariesElement!: ElementRef;
  @ViewChild('components') componentsElement!: ElementRef;

  qnbLink: string = environment.insurance.quoteAndBuyURL + '/main.js';
  insuranceElementsLink: string =
    environment.insurance.elementsURL + '/main.js';
  qnbPolyfills: string = environment.insurance.quoteAndBuyURL + '/polyfills.js';
  insuranceElementsPolyfills: string =
    environment.insurance.elementsURL + '/polyfills.js';

  referrerCode = '';
  httpClient = inject(HttpClient);
  titleService = inject(Title);
  referrerSet = false;
  referrerName = '';
  isSidebar = false;
  offset = 100;
  public introductionOffset: number = 0;
  public getStartedOffset: number = 0;
  public siteCodeOffset: number = 0;
  public themingOffset: number = 0;

  public securityOffset: number = 0;
  public clientLibrariesOffset: number = 0;
  public componentsOffset: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setOffset();
  }

  @HostListener('window:scroll', ['$event'])
  checkOffsetTop(event: any) {
    console.log(event);

    let offset = window.pageYOffset + this.offset;
    let currentIndex = 0;
    if (offset >= this.getStartedOffset && offset < this.siteCodeOffset) {
      currentIndex = 1;
    } else if (offset >= this.siteCodeOffset && offset < this.themingOffset) {
      currentIndex = 2;
    } else if (offset >= this.themingOffset && offset < this.securityOffset) {
      currentIndex = 3;
    } else if (
      offset >= this.securityOffset &&
      offset < this.clientLibrariesOffset
    ) {
      currentIndex = 4;
    } else if (
      offset >= this.clientLibrariesOffset &&
      offset < this.componentsOffset
    ) {
      currentIndex = 5;
    } else if (offset >= this.componentsOffset) {
      currentIndex = 6;
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

  setOffset() {
    if (window.innerWidth > 768) {
      this.offset = 100;
    } else {
      this.offset = 150;
    }
  }
  ngOnInit() {
    let config = localStorage.getItem('insuranceConfig');
    if (!!config && !localStorage.getItem('elementType')) {
      this.setDefaultReferrer(true);
    } else {
      this.referrerSet = true;
      this.referrerName = localStorage.getItem('certua-referrerName') ?? '';
    }

    this.titleService.setTitle('Insurance Elements Overview | Certua');
  }

  ngAfterViewInit(): void {
    this.getStartedOffset = this.getStartedElement.nativeElement.offsetTop;
    this.siteCodeOffset = this.siteCodeElement.nativeElement.offsetTop;
    this.themingOffset = this.themingElement.nativeElement.offsetTop;

    this.securityOffset = this.securityElement.nativeElement.offsetTop;
    this.clientLibrariesOffset =
      this.clientLibrariesElement.nativeElement.offsetTop;
    this.componentsOffset = this.componentsElement.nativeElement.offsetTop;
  }

  reset() {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('elementType', 'insurance');
    window.dispatchEvent(
      new CustomEvent('show-navigation', { detail: { show: false } })
    );
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

    localStorage.setItem('certua-referrerName', this.referrerName);
    localStorage.setItem('elementType', 'insurance');

    localStorage.setItem(
      'insuranceConfig',
      JSON.stringify({
        referrerId: this.referrerCode,
        basePath: 'angular/components/quote-and-buy',
      })
    );

    window.dispatchEvent(
      new CustomEvent('show-navigation', { detail: { show: true } })
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
