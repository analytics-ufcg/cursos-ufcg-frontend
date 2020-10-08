import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhaGradeComponent } from './minha-grade.component';

describe('MinhaGradeComponent', () => {
  let component: MinhaGradeComponent;
  let fixture: ComponentFixture<MinhaGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinhaGradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhaGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
