import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxogramaComponent } from './fluxograma.component';

describe('FluxogramaComponent', () => {
  let component: FluxogramaComponent;
  let fixture: ComponentFixture<FluxogramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FluxogramaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
