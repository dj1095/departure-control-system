import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/shared/flight.model';
import { SeatMapService } from '../seat-map/seat-map.service';
import { MockDataService } from 'src/app/home/mock-data.service';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-in-flight',
  templateUrl: './in-flight.component.html',
  styleUrls: ['./in-flight.component.css']
})
export class InFlightComponent implements OnInit {

  constructor(private seatMapService: SeatMapService,
              private dataService: MockDataService,
              private flightService: FlightService) { }
  loadedFlight: Flight;
  totalSeats: number[] = this.seatMapService.getTotalSeats();
  ngOnInit() {
    this.loadedFlight = this.dataService.getCurrentFlight();
  }

  getToolTip(seatNumber) {
    const pax = this.flightService.getseatNumberWithPaxMap().get(seatNumber.toString());
    if (pax) {
      return pax.mealPreference;
    }
  }

  getColorCodes(seatNumber: string) {
    return this.flightService.getpaxRequiringSpecialMealsMap().get(seatNumber.toString());
  }
}
