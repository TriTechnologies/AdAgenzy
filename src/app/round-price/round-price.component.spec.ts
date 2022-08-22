import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundPriceComponent } from './round-price.component';

describe('RoundPriceComponent', () => {
  let component: RoundPriceComponent;
  let fixture: ComponentFixture<RoundPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
