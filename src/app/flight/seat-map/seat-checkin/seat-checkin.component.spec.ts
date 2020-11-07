import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatCheckinComponent } from './seat-checkin.component';

describe('SeatCheckinComponent', () => {
  let component: SeatCheckinComponent;
  let fixture: ComponentFixture<SeatCheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatCheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
