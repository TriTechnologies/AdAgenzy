import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorsStockComponent } from './competitors-stock.component';

describe('CompetitorsStockComponent', () => {
  let component: CompetitorsStockComponent;
  let fixture: ComponentFixture<CompetitorsStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitorsStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitorsStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
