import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IncorrectoComponent } from './incorrecto.component';

describe('IncorrectoComponent', () => {
  let component: IncorrectoComponent;
  let fixture: ComponentFixture<IncorrectoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IncorrectoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IncorrectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
