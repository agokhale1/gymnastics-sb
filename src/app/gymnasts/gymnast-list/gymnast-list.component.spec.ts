import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GymnastListComponent } from './gymnast-list.component';

describe('GymnastListComponent', () => {
  let component: GymnastListComponent;
  let fixture: ComponentFixture<GymnastListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GymnastListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymnastListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
