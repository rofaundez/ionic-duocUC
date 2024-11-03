import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CorreoComponent } from './correo.component';

describe('CorreoComponent', () => {
  let component: CorreoComponent;
  let fixture: ComponentFixture<CorreoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CorreoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
