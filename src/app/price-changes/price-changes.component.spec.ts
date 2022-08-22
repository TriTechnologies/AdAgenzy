import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceChangesComponent } from './price-changes.component';

describe('PriceChangesComponent', () => {
  let component: PriceChangesComponent;
  let fixture: ComponentFixture<PriceChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceChangesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
