import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JsonPipe, NgIf } from '@angular/common';
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

@Component({
  selector: 'app-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.scss'],
  standalone: true,
  imports: [NgIf, RouterLink, JsonPipe, InsuranceCommonInputsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ViewPolicyComponent implements OnInit {
  accessToken: any;
  config: any;
  showError = false;
  router = inject(Router);
  route = inject(ActivatedRoute);
  loaded = false;
  //this is bound from the route param
  @Input('id') policyId = '';

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
      this.router.navigate(['/components/connect']);
    }

    let configJson = localStorage.getItem('insuranceConfig');

    if (!!configJson) {
      this.config = configJson;
    }

    this.accessToken = localStorage.getItem('certua-accessToken');

    this.loaded = true;
  }

  goToQuoteAndBuy(value: any) {
    console.log('goToQuoteAndBuy event', value);
    this.router.navigate(['/components/quote-and-buy'], { state: { value } });
  }
  goToMyPolicies() {
    this.router.navigate(['/components/policies-list']);
  }

  goToMakeAClaim(value: any) {
    console.log('makeAClaim event', value);
    this.router.navigate(['/components/fnol'], {
      state: { data: value.detail },
    });
  }
}
