import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Flight } from '../shared/flight.model';
import { MockDataService } from './mock-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  errorOccured = false;
  errorMessage = '';
  result: Flight[] = null;
  isNoResultsFound: boolean;
  showBusyDisplay = false;
  flightSearchForm: FormGroup;
  constructor(private mockDataService: MockDataService) {

  }

  ngOnInit() {
    this.flightSearchForm = new FormGroup({
      departureStation: new FormControl(null, Validators.required),
      arrivalStation: new FormControl(null),
      departureDate: new FormControl(null, [Validators.required])
    });
  }

  onSearch(): Flight[] {
    this.showBusyDisplay = true;
    this.isNoResultsFound = false;
    this.mockDataService.getFlightsData().
      subscribe(flightsList => {
        this.result = null;
        this.errorOccured = false;
        this.result = this.filterFlights(flightsList);
        if (!this.result || this.result.length === 0) {
          this.isNoResultsFound = true;
        } else {
          this.isNoResultsFound = false;
        }
      }, (err) => {
        this.errorOccured = true;
        this.errorMessage = 'Search Failed!!!';
      });
    this.showBusyDisplay = false;
    return this.result;
  }

  onAssign(flight: Flight) {
    this.mockDataService.assignFlight(flight.flightNumber);
  }


  // filter flights based on user input
  filterFlights(flights: Flight[]): Flight[] {
    const searchResults: Flight[] = [];
    const departureStation: string = this.flightSearchForm.get('departureStation').value;
    const arrivalStation: string = this.flightSearchForm.get('arrivalStation').value;
    const departureDate: string = this.flightSearchForm.get('departureDate').value.toDateString();
    if (flights.length) {
      flights.forEach(flight => {
        if (departureStation.toUpperCase() === flight.departureStation &&
          departureDate === flight.departureDate) {
          if (!arrivalStation) {
            searchResults.push(flight);
          } else if (arrivalStation.toUpperCase() === flight.arrivalStation) {
            searchResults.push(flight);
          }
        }
      });
    }
    return searchResults;
  }
}
