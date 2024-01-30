import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
} from '@angular/core';
import { add, parseISO } from 'date-fns';

@Component({
  selector: 'app-insurance-common-inputs',
  templateUrl: './common-inputs.component.html',
  styleUrls: ['./common-inputs.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InsuranceCommonInputsComponent implements OnInit {
  @Input() quoteAndBuy = false;
  config = {
    referrerId: 'xxxxx-xxxx-xxxx',
    basePath: 'angular/components/quote-and-buy',
  };
  ngOnInit() {}
}
