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
import { CommonInputsComponent } from '../../open-banking/common-inputs/common-inputs.component';
import { InsuranceCommonInputsComponent } from '../insurance-common-inputs/common-inputs.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [NgIf, RouterLink, JsonPipe, InsuranceCommonInputsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent implements OnInit {
  accessToken: any;
  config: any;
  showError = false;
  router = inject(Router);
  route = inject(ActivatedRoute);
  loaded = false;
  loginSuccess = false;

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

    this.loaded = true;
  }

  setLoginSuccess(value: any) {
    this.loginSuccess = value.detail;
  }
}
