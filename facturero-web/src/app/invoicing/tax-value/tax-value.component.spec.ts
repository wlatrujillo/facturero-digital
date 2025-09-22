import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxValueComponent } from './tax-value.component';

describe('TaxValueComponent', () => {
  let component: TaxValueComponent;
  let fixture: ComponentFixture<TaxValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
