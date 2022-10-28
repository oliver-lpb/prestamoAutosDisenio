import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteListClientesComponent } from './reporte-list-clientes.component';

describe('ReporteListClientesComponent', () => {
  let component: ReporteListClientesComponent;
  let fixture: ComponentFixture<ReporteListClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteListClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteListClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
