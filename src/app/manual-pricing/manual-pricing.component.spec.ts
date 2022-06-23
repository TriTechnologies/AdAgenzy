import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualPricingComponent } from './manual-pricing.component';

describe('ManualPricingComponent', () => {
  let component: ManualPricingComponent;
  let fixture: ComponentFixture<ManualPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualPricingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
