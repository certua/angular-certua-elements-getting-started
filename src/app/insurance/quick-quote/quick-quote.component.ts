import { Router, RouterLink } from '@angular/router';
import { JsonPipe, NgIf } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  inject,
  NgZone,
  OnInit,
} from '@angular/core';
import { add, parseISO } from 'date-fns';
import { InjectSetupWrapper } from '@angular/core/testing';
import { InsuranceCommonInputsComponent } from '../insurance-common-inputs/common-inputs.component';

@Component({
  selector: 'app-quick-quote',
  templateUrl: './quick-quote.component.html',
  styleUrls: ['./quick-quote.component.scss'],
  standalone: true,
  imports: [NgIf, RouterLink, JsonPipe, InsuranceCommonInputsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class QuickQuoteComponent implements OnInit {
  accessToken: any;
  config: any;
  showError = false;
  router = inject(Router);
  loaded = false;
  quickQuoteJson = '';
  ngOnInit() {
    if (!localStorage.getItem('elementType')) {
      this.router.navigate(['/home']);
    } else if (localStorage.getItem('elementType') == 'open-banking') {
      this.router.navigate(['/components/connect']);
    }

    let configJson = localStorage.getItem('insuranceConfig');

    if (!!configJson) {
      this.config = configJson;
    }

    this.accessToken = localStorage.getItem('certua-accessToken');

    this.loaded = true;
  }

  updateQuote(quote: any) {
    console.log('quote emitted', quote);
    this.quickQuoteJson = quote.detail;
  }
}