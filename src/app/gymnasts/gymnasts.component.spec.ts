import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GymnastsComponent } from './gymnasts.component';

describe('GymnastsComponent', () => {
  let component: GymnastsComponent;
  let fixture: ComponentFixture<GymnastsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GymnastsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymnastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
