import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CorrectoComponent } from './correcto.component';

describe('CorrectoComponent', () => {
  let component: CorrectoComponent;
  let fixture: ComponentFixture<CorrectoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CorrectoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CorrectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
