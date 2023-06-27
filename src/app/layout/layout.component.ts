import {
  RouterOutlet,
  RouterLink,
  ActivatedRoute,
  Router,
  NavigationEnd,
  NavigationStart,
  RouterLinkActive,
} from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  showNavigation = false;
  elementType: string = '';
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        tap((event: any) => {
          let homeurl = event['url'].includes('home') || event['url'] === '/';
          this.showNavigation = !homeurl;

          let type: string = localStorage.getItem('elementType') ?? '';
          this.elementType = type;
        })
      )
      .subscribe();
    const home = location.pathname.includes('home');
    this.showNavigation = !home;
  }
}
