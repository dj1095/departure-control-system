import { Injectable } from '@angular/core';
import { Flight } from '../shared/flight.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Passenger } from '../shared/passenger.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  currentFlightNumber: string;
  private currentFlight: Flight = null;
  private flightsUrl = '/assets/data/flights.json';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient) { }


  getFlightsData(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.flightsUrl);
  }

  loadFlight(flightNumber: string): Observable<Flight> {
    return this.getFlightsData().pipe(map(flights => {
      if (flights && flights.length > 0) {
        for (const flight of flights) {
          if (flightNumber === flight.flightNumber) {
            this.currentFlight = flight;
            return flight;
          }
        }
      }
    }));
  }


  assignFlight(flightNumber: string): void {
    this.currentFlightNumber = flightNumber;
    this.router.navigate(['flights', flightNumber], { relativeTo: this.activatedRoute });
  }

  getCurrentFlight(): Flight {
    return (this.currentFlight) ? this.currentFlight : null;
  }

}
