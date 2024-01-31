import { environment } from 'src/environments/environment';
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

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss'],
  standalone: true,
  imports: [RouterLink, JsonPipe, InsuranceCommonInputsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClaimsComponent implements OnInit {
  accessToken: any;
  config: any;
  showError = false;
  router = inject(Router);
  loaded = false;
  public environment = environment;
  ngOnInit() {
    let configJson = localStorage.getItem('insuranceConfig');

    if (!!configJson) {
      this.config = JSON.parse(configJson);
      this.loaded = true;
    }
  }
}
