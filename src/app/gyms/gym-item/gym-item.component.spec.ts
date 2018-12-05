import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GymItemComponent } from './gym-item.component';

describe('GymItemComponent', () => {
  let component: GymItemComponent;
  let fixture: ComponentFixture<GymItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GymItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
