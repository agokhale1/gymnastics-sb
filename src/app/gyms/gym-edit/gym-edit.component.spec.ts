import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GymEditComponent } from './gym-edit.component';

describe('GymEditComponent', () => {
  let component: GymEditComponent;
  let fixture: ComponentFixture<GymEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GymEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
