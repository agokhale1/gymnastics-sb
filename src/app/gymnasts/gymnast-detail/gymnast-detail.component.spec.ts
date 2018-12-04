import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GymnastDetailComponent } from './gymnast-detail.component';

describe('GymnastDetailComponent', () => {
  let component: GymnastDetailComponent;
  let fixture: ComponentFixture<GymnastDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GymnastDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymnastDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
