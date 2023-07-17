import { NgIf } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
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
export class InsuranceSetupComponent {
  Step = Step;
  referrerCode = '';
  router = inject(Router);
  step = Step.ReferrerCode;

  reset() {
    this.step = Step.ReferrerCode;
  }

  back(chosenStep: Step) {
    this.step = chosenStep;
  }

  goToComponents() {
    this.router.navigate(['/components/quote-and-buy']);
  }

  setReferrer(value?: string) {
    this.step = Step.Success;
    if (!!value) {
      this.referrerCode = value;
    }

    localStorage.setItem(
      'insuranceConfig',
      JSON.stringify({
        referrerId: this.referrerCode,
        basePath: 'angular/components/quote-and-buy',
      })
    );
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
    this.router.navigate(['/components/connect']);
  }
}
