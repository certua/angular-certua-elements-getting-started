import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgSwitch, NgSwitchDefault, NgSwitchCase, RouterOutlet, RouterLink],
})
export class AppComponent implements OnInit {
  title = 'get-started-open-banking-angular';
  elementType: string = '';
  openBankingUrl = environment.openBanking.elementsURL + '/main.js';

  quoteAndBuyUrl = environment.insurance.quoteAndBuyURL + '/main.js';
  insuranceElementsUrl = environment.insurance.elementsURL + '/main.js';
  ngOnInit() {
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
