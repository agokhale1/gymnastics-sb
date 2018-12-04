import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GymnastNewComponent } from './gymnast-new.component';

describe('GymnastNewComponent', () => {
  let component: GymnastNewComponent;
  let fixture: ComponentFixture<GymnastNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GymnastNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymnastNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
