import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InFlightComponent } from './in-flight.component';

describe('InFlightComponent', () => {
  let component: InFlightComponent;
  let fixture: ComponentFixture<InFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InFlightComponent ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
