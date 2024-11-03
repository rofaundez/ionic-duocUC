import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PreguntaComponent } from './pregunta.component';

describe('PreguntaComponent', () => {
  let component: PreguntaComponent;
  let fixture: ComponentFixture<PreguntaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PreguntaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
