import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceMinMaxComponent } from './price-min-max.component';

describe('PriceMinMaxComponent', () => {
  let component: PriceMinMaxComponent;
  let fixture: ComponentFixture<PriceMinMaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceMinMaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceMinMaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
