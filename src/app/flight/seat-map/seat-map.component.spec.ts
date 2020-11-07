import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatMapComponent } from './seat-map.component';

describe('SeatMapComponent', () => {
  let component: SeatMapComponent;
  let fixture: ComponentFixture<SeatMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatMapComponent ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
