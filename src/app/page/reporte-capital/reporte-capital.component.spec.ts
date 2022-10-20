import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCapitalComponent } from './reporte-capital.component';

describe('ReporteCapitalComponent', () => {
  let component: ReporteCapitalComponent;
  let fixture: ComponentFixture<ReporteCapitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteCapitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
