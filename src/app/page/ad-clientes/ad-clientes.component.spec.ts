import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdClientesComponent } from './ad-clientes.component';

describe('AdClientesComponent', () => {
  let component: AdClientesComponent;
  let fixture: ComponentFixture<AdClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
