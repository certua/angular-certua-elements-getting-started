import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObOverviewComponent } from './ob-overview.component';

describe('ObOverviewComponent', () => {
  let component: ObOverviewComponent;
  let fixture: ComponentFixture<ObOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ObOverviewComponent]
    });
    fixture = TestBed.createComponent(ObOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
