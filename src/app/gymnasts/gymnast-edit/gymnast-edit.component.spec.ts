import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GymnastEditComponent } from './gymnast-edit.component';

describe('GymnastEditComponent', () => {
  let component: GymnastEditComponent;
  let fixture: ComponentFixture<GymnastEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GymnastEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymnastEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
