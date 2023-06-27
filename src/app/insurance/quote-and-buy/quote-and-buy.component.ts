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
  selector: 'app-quote-and-buy',
  templateUrl: './quote-and-buy.component.html',
  styleUrls: ['./quote-and-buy.component.scss'],
  standalone: true,
  imports: [NgIf, RouterLink, JsonPipe, InsuranceCommonInputsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class QuoteAndBuyComponent implements OnInit {
  accessToken: any;
  config: any;
  showError = false;
  router = inject(Router);
  loaded = false;

  ngOnInit() {
    if (localStorage.getItem('elementType') !== 'insurance') {
      this.router.navigate(['/components/connect']);
    }

    let configJson = localStorage.getItem('insuranceConfig');

    if (!!configJson) {
      this.config = configJson;
    }

    this.accessToken = localStorage.getItem('certua-accessToken');

    this.loaded = true;
  }
}
