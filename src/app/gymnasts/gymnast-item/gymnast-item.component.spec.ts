import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GymnastItemComponent } from './gymnast-item.component';

describe('GymnastDisplayComponent', () => {
  let component: GymnastItemComponent;
  let fixture: ComponentFixture<GymnastItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GymnastItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymnastItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
