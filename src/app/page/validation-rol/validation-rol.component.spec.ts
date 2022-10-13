import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationRolComponent } from './validation-rol.component';

describe('ValidationRolComponent', () => {
  let component: ValidationRolComponent;
  let fixture: ComponentFixture<ValidationRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationRolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
