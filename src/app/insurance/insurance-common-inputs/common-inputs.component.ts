import { RouterLink } from '@angular/router';

import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  input
} from '@angular/core';
import { add, parseISO } from 'date-fns';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-insurance-common-inputs',
  templateUrl: './common-inputs.component.html',
  styleUrls: ['./common-inputs.component.scss'],
  imports: [RouterLink, JsonPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InsuranceCommonInputsComponent implements OnInit {
  readonly quoteAndBuy = input(false);
  config = {
    referrerId: 'xxxxx-xxxx-xxxx',
    basePath: 'angular/insurance/components/quote-and-buy',
    displayQuickQuote: true,
  };
  ngOnInit() {}
}
