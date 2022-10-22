import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximosPagarComponent } from './proximos-pagar.component';

describe('ProximosPagarComponent', () => {
  let component: ProximosPagarComponent;
  let fixture: ComponentFixture<ProximosPagarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProximosPagarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProximosPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
