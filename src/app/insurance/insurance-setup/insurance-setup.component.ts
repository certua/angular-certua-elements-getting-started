import { NgIf } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
export enum Step {
  ReferrerCode,
  Success,
  Error,
}

@Component({
  selector: 'app-insurance-setup',
  templateUrl: './insurance-setup.component.html',
  styleUrls: ['./insurance-setup.component.scss'],
  standalone: true,
  providers: [],
  imports: [NgIf, FormsModule, ReactiveFormsModule, RouterModule],
})
export class InsuranceSetupComponent implements OnInit {
  Step = Step;
  referrerCode = '';
  router = inject(Router);
  step = Step.ReferrerCode;
  httpClient = inject(HttpClient);

  ngOnInit() {
    let config = localStorage.getItem('insuranceConfig');
    if (!!config) {
      this.step = Step.Success;
    }
  }

  reset() {
    this.step = Step.ReferrerCode;
  }

  back(chosenStep: Step) {
    this.step = chosenStep;
  }

  goToComponents() {
    this.router.navigate(['/components/claims']);
  }

  setReferrer(value?: string) {
    this.step = Step.Success;
    if (!!value) {
      this.referrerCode = value;
    }
    localStorage.clear();
    sessionStorage.clear();

    localStorage.setItem('elementType', 'insurance');

    localStorage.setItem(
      'insuranceConfig',
      JSON.stringify({
        referrerId: this.referrerCode,
        basePath: 'angular/components/quote-and-buy',
      })
    );

    this.httpClient
      .get(environment.uxAPIUrl + '/dfp/is-sidebar/' + this.referrerCode)
      .subscribe((data) => {
        console.log('data', data);
        localStorage.setItem('certua-sidebar', data.toString());
      });
  }

  setDefaultReferrer(sidebar = false) {
    if (sidebar) {
      this.setReferrer(environment.insurance.demoSidebarCode);
    } else {
      this.setReferrer(environment.insurance.demoSiteCode);
    }
  }
  startAgain() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
    this.step = Step.ReferrerCode;
  }
}
