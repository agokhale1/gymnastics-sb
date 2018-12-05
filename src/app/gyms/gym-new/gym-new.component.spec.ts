import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GymNewComponent } from './gym-new.component';

describe('GymNewComponent', () => {
  let component: GymNewComponent;
  let fixture: ComponentFixture<GymNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GymNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
