import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  inject,
  Input,
  NgZone,
  OnInit,
} from '@angular/core';
import { add, parseISO } from 'date-fns';
import { InjectSetupWrapper } from '@angular/core/testing';
import { InsuranceCommonInputsComponent } from '../insurance-common-inputs/common-inputs.component';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-view-policy-v2',
  templateUrl: './view-policy-v2.component.html',
  styleUrls: ['./view-policy-v2.component.scss'],
  standalone: true,
  imports: [RouterLink, JsonPipe, InsuranceCommonInputsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ViewPolicyV2Component implements OnInit {
  accessToken: any;
  config: any;
  showError = false;
  router = inject(Router);
  route = inject(ActivatedRoute);
  loaded = false;
  clientId: string = '';
  organisationId: string = '';
  public environment = environment;
  makeAClaimJson = {
    address: {
      addressLine1: '9 Anchor House',
      addressLine2: 'Anchor Quay',
      addressLine3: '',
      city: 'Norwich',
      country: 'UK',
      county: 'Norfolk',
      postCode: 'NR3 3XP',
      type: 'Correspondence',
    },
    insuredFullName: 'Chuck Allen',
    policyNumber: 'CER_TestPolicy-600-P005258',
  };

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
      this.config = configJson;
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
    console.log('goToQuoteAndBuy event', value);
    this.router.navigate(['/components/quote-and-buy'], { state: { value } });
  }

  goToMakeAClaim(value: any) {
    console.log('makeAClaim event', value);
    this.router.navigate(['/components/fnol'], {
      state: { data: value.detail },
    });
  }
}
