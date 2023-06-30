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
  elementType: string = '';
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  selectedIndex = 0;
  @ViewChild('tabArrows')
  tabArrows!: TabArrowsComponent;

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationStart),
        tap((event: any) => {
          let homeurl = event['url'].includes('home') || event['url'] === '/';

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
  }
  selectItem(i: number, route: string) {
    this.tabArrows.selectItem(i);

    this.selectedIndex = i;
    this.router.navigate([route]);
  }
  removeType() {
    this.elementType = '';
    localStorage.removeItem('elementType');
  }

  checkSelected(page: string) {
    console.log('route', page);
    switch (page) {
      case 'connect':
      case 'quote-and-buy': {
        this.selectedIndex = 0;
        break;
      }
      case 'manage-connections':
      case 'claims': {
        this.selectedIndex = 1;
        break;
      }
      case 'account-summary':
      case 'fnol': {
        this.selectedIndex = 2;
        break;
      }
      case 'transactions': {
        this.selectedIndex = 3;
        break;
      }
      case 'cashflow': {
        this.selectedIndex = 4;
        break;
      }
    }
  }
}
