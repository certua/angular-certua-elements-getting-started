import { Router, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';
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
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss'],
  standalone: true,
  imports: [RouterLink, JsonPipe, InsuranceCommonInputsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class QuoteListComponent implements OnInit {
  accessToken: any;
  config: any;
  showError = false;
  router = inject(Router);
  loaded = false;
  clientId = '';
  organisationId = '';
  public environment = environment;
  goToQuoteAndBuyJson = {
    quote: 'e.quote',
    policyId: 'e.policyId',
    restartJourney: 'e.restartJourney',
  };

  ngOnInit() {
    if (!localStorage.getItem('elementType')) {
      this.router.navigate(['/home']);
    } else if (localStorage.getItem('elementType') == 'open-banking') {
      this.router.navigate(['/open-banking/components/connect']);
    }

    let configJson = localStorage.getItem('insuranceConfig');

    if (!!configJson) {
      this.config = JSON.parse(configJson);
    }

    this.accessToken = localStorage.getItem('certua-accessToken');

    let loggedInUser = localStorage.getItem('certua-loggedInUser') ?? '';
    if (!!loggedInUser) {
      this.clientId = JSON.parse(loggedInUser).clientId;
      this.organisationId = JSON.parse(loggedInUser).organisationId;
    }

    this.loaded = true;
  }
  goToQuoteAndBuy(value: any) {
    let newConfig = localStorage.getItem('insuranceConfig') as any;
    newConfig = JSON.parse(newConfig);
    newConfig = {
      ...newConfig,
      quote: value.detail.quote,
    };
    localStorage.setItem('insuranceConfig', JSON.stringify(newConfig));
    console.log('goToQuoteAndBuy event', value);
    this.router.navigate(['/insurance/components/quote-and-buy'], {
      state: { data: value.detail },
    });
  }
}
