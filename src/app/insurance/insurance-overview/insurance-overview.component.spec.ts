import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceOverviewComponent } from './insurance-overview.component';

describe('InsuranceOverviewComponent', () => {
  let component: InsuranceOverviewComponent;
  let fixture: ComponentFixture<InsuranceOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InsuranceOverviewComponent]
    });
    fixture = TestBed.createComponent(InsuranceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
