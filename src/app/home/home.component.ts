
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ObSetupComponent } from '../open-banking/ob-setup/ob-setup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  providers: [],
  imports: [FormsModule, RouterModule, ObSetupComponent],
})
export class HomeComponent implements OnInit {
  elementType: string = '';
  openBankingUrl = environment.openBanking.elementsURL + '/main.js';

  quoteAndBuyUrl = environment.insurance.quoteAndBuyURL + '/main.js';
  insuranceElementsUrl = environment.insurance.elementsURL + '/main.js';
  router = inject(Router);
  ngOnInit() {
    let type = localStorage.getItem('elementType');
    if (!!type) {
      this.elementType = type;

      if (this.elementType == 'insurance') {
        this.router.navigate(['overview-insurance']);
      }
    }
  }
  setType(type: string) {
    localStorage.setItem('elementType', type);
    this.elementType = type;
    if (type == 'open-banking') {
      this.loadScript(this.openBankingUrl, null);
    } else {
      this.loadScript(this.quoteAndBuyUrl, null);
      this.loadScript(this.insuranceElementsUrl, null);
      this.router.navigate(['overview-insurance']);
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
}
