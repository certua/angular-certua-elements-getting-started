import { environment } from 'src/environments/environment';
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
  selector: 'app-fnol',
  templateUrl: './fnol.component.html',
  styleUrls: ['./fnol.component.scss'],
  standalone: true,
  imports: [NgIf, RouterLink, JsonPipe, InsuranceCommonInputsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FnolComponent implements OnInit {
  accessToken: any;
  config: any;
  showError = false;
  router = inject(Router);
  loaded = false;
  prefill: any;
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

  ngOnInit() {
    if (!localStorage.getItem('elementType')) {
      this.router.navigate(['/home']);
    } else if (localStorage.getItem('elementType') == 'open-banking') {
      this.router.navigate(['/components/connect']);
    }

    let configJson = localStorage.getItem('insuranceConfig');

    if (!!configJson) {
      this.config = JSON.parse(configJson);
    }

    this.accessToken = localStorage.getItem('certua-accessToken');

    console.log('state', window.history.state);
    this.prefill = window.history.state.data;
    this.loaded = true;
  }
}
