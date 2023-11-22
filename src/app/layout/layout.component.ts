import {
  RouterOutlet,
  RouterLink,
  ActivatedRoute,
  Router,
  NavigationEnd,
  NavigationStart,
  RouterLinkActive,
} from '@angular/router';
import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { filter, map, tap } from 'rxjs';
import { CommonInputsComponent } from '../open-banking/common-inputs/common-inputs.component';
import { TabArrowsComponent } from '../tab-arrows/tab-arrows.component';
export enum SiteSection {
  Home,
  Overview,
  Components,
}
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonInputsComponent,
    TabArrowsComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  showNavigation = false;
  showComponentMenu = false;
  elementType: string = '';
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  selectedIndex = 0;
  @ViewChild('tabArrows')
  tabArrows!: TabArrowsComponent;
  fullScreen = false;
  SiteSection = SiteSection;

  section = SiteSection.Home;
  ngOnInit() {
    window.addEventListener('selected-index', (event: any) => {
      this.selectedIndex = event.detail.index;
    });

    this.router.events
      .pipe(
        filter(
          (event: any) =>
            event instanceof NavigationEnd ||
            event.routerEvent instanceof NavigationEnd
        ),
        tap((event: any) => {
          if (!event['url']) {
            event = event.routerEvent;
          }
          let homeurl = event['url'].includes('home') || event['url'] === '/';
          if (homeurl) {
            this.section = SiteSection.Home;
          } else {
            if (event['url'].includes('components')) {
              this.section = SiteSection.Components;
            }
            if (event['url'].includes('overview')) {
              this.section = SiteSection.Overview;
            }
          }

          this.showNavigation = !homeurl;

          let type: string = localStorage.getItem('elementType') ?? '';
          this.elementType = type;
          let page = event['url'].replace('/components/', '');
          this.checkSelected(page);
        })
      )
      .subscribe();

    const home = location.pathname.includes('home');
    this.showNavigation = !home;
    let type: string = localStorage.getItem('elementType') ?? '';
    this.elementType = type;
    let page = location.pathname.replace('/angular/components/', '');
    this.checkSelected(page);

    addEventListener('show-navigation', (event: any) => {
      this.showComponentMenu = event.detail.show;
    });

    if (
      (type == 'insurance' && localStorage.getItem('insuranceConfig')) ||
      type == 'open-banking'
    ) {
      this.showComponentMenu = true;
    }
  }

  backToGettingStarted() {
    this.router.navigate(['components/claims']);
  }
  selectItem(i: number, route: string, section?: string) {
    this.tabArrows.selectItem(i);

    if (!section) {
      this.router.navigate([route]);
      this.selectedIndex = i; //dont' set this as host listener will
    } else {
      this.router.navigate([route], { fragment: section });
    }
  }
  removeType() {
    this.elementType = '';
    localStorage.removeItem('elementType');
  }

  checkSelected(page: string) {
    console.log('route', page);
    switch (page) {
      case 'connect':

      case 'insurance-overview':
      case 'overview': {
        this.selectedIndex = 0;
        break;
      }
      case 'manage-connections':
      case 'quote-and-buy':
      case 'claims': {
        this.selectedIndex = 1;
        break;
      }
      case 'account-summary': {
        this.selectedIndex = 2;
        break;
      }
      case 'transactions':
      case 'fnol': {
        this.selectedIndex = 3;
        break;
      }
      case 'cashflow':
      case 'quick-quote': {
        this.selectedIndex = 4;
        break;
      }

      case 'login': {
        this.selectedIndex = 5;
        break;
      }
      case 'view-policy':
      case 'manage-policy': {
        this.selectedIndex = 6;
        break;
      }
    }
    if (page.includes('view-policy')) {
      this.selectedIndex = 6;
    }

    if (
      page.includes('quote-and-buy') &&
      localStorage.getItem('certua-sidebar') == 'true'
    ) {
      this.fullScreen = true;
    } else {
      this.fullScreen = false;
    }
  }

  watchAnyObject(object: any, methods: any[], callback: Function) {
    for (let method of methods) {
      let original = object[method].bind(object);
      const newMethod = function (...args: any[]) {
        let result = original(...args);
        callback(method, ...args);
        return result;
      };
      object[method] = newMethod.bind(object);
    }
  }
}
