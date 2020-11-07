import { Component, OnInit, OnDestroy } from '@angular/core';
import { MockDataService } from '../home/mock-data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Flight } from '../shared/flight.model';
import { Passenger } from '../shared/passenger.model';
import { LoginService } from '../login.service';
import { FlightService } from './flight.service';
import { throwError } from 'rxjs';
import { SeatMapService } from './seat-map/seat-map.service';
import { PassengerService } from './passengers/passenger.service';
import { CheckinStatus } from '../shared/enums/CheckinStatus.enum';
import { NgForm } from '@angular/forms';
import { AncillaryService } from '../shared/enums/AncillaryService.enum';
import { InFlightShop } from '../shared/enums/InFlightShop.enum';
import { MealPreference } from '../shared/enums/MealPreference.enum';
import { AppUtilService } from '../app-util.service';
import { MatDialog } from '@angular/material';
import { PassengerComponent } from './passengers/passenger/passenger.component';
import { SeatStatus } from '../shared/seatStatus.model';

export interface SelectValue {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit, OnDestroy {


  passengerStatuses: SelectValue[] = [
    { value: '', viewValue: 'None' },
    { value: 'ALL', viewValue: 'All Passengers' },
    { value: 'AC', viewValue: 'Checked-in' },
    { value: 'NC', viewValue: 'Not-Checked-in' },
    { value: 'WC', viewValue: 'Wheel-Chair' },
    { value: 'INF', viewValue: 'Infant-Associated' }
  ];

  passengerMissingFilter: SelectValue[] = [
    { value: 'ALL', viewValue: 'All Passengers' },
    { value: 'PSPT', viewValue: 'Passport' },
    { value: 'Address', viewValue: 'Address' },
    { value: 'DOB', viewValue: 'Date Of Birth' },
  ];
  mealPreferences: MealPreference[] = [MealPreference.AVML, MealPreference.IVML, MealPreference.NVML];

  services: SelectValue[] = [
    { value: 'Checkin', viewValue: 'Check-in' },
    { value: 'InFlight', viewValue: 'In-Flight' },
  ];

  // manage: SelectValue[] = [
  //   { value: 'Passengers', viewValue: 'Passengers' },
  //   { value: 'AncillaryServices', viewValue: 'Ancillary Services' },
  //   { value: 'SpecialMeals', viewValue: 'Special Meals' },
  //   { value: 'ShoppingItems', viewValue: 'Shopping Items' }
  // ];

  manage: SelectValue[] = [
    { value: 'Passengers', viewValue: 'Passengers' },
  ];


  loadedFlight: Flight;
  isFlightLoading = true;
  flightNumber = '';
  selctedValue: string;
  passengers: Passenger[];
  isSeatMapVisible = false;
  serviceSelectedvalue: string;
  paxList: Passenger[];
  isAdminMode: boolean;
  manageSelectedValue: string;
  missingFilterSelectedValue: string;
  checkinStatus: string;

  ancillaryServicesList = [AncillaryService.ENT, AncillaryService.EXC, AncillaryService.FB];
  shoppingItemList = [InFlightShop.BEER, InFlightShop.BSC];


  constructor(
    private mockDataService: MockDataService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    private seatMapService: SeatMapService,
    private paxService: PassengerService,
    private appUtilService: AppUtilService,
    private loginService: LoginService,
    private dialog: MatDialog) { }
  ngOnDestroy(): void {
    const seatsOccupied: SeatStatus[] = this.flightService.getSeatsOccupied();
    seatsOccupied.splice(0, seatsOccupied.length);
    this.seatMapService.setseatsAvailable(null);
    this.flightService.getcheckedInPassenegersMap().clear();
    this.flightService.getpaxRequiringSpecialMealsMap().clear();
  }

  ngOnInit() {
    this.activatedRouter.params
      .subscribe((params: Params) => {
        this.flightNumber = params.flightNumber;
        this.mockDataService.currentFlightNumber = this.flightNumber;
        this.initializeFlight();
      });
    this.seatMapService.getSeatMapLoaded().subscribe(value => {
      this.isSeatMapVisible = value;
    });
    this.loginService.loginSucessful.subscribe((user) => {
      if (user && (user.role === 'admin')) {
        this.isAdminMode = true;
      }
    });
  }

  initializeFlight() {
    this.mockDataService.loadFlight(this.flightNumber).subscribe(flight => {
      this.isFlightLoading = (flight) ? false : null;
      this.loadedFlight = flight;
      this.flightService.setCurrentFlight(this.loadedFlight);
      this.loadOccupiedSeatsStatus(flight);
    });
  }

  onSelected(selectedValue: string) {
    if (selectedValue === 'InFlight') {
      this.paxList = this.paxService.getPassengerListByStatus(CheckinStatus.AC);
    }
  }

  loadOccupiedSeatsStatus(loadedFlight: Flight) {
    const flight = loadedFlight;
    if (flight && flight.passengerList) {
      flight.passengerList.forEach(pax => {
        if (pax.checkinStatus === 'AC' && this.flightService.isNumericValue(pax.seatNumber)) {
          this.flightService.assignSeat(pax);
        }
      });
    } else {
      throwError('Error Loading Flight Details');
    }
  }

  onSave(form: NgForm, pax: Passenger) {
    if (form.value) {
      if (form.value.ancillaries) {
        pax.ancillaryServicesList = form.value.ancillaries;
      }
      if (form.value.shop) {
        pax.inFlightShopReqList = form.value.shop;
      }
      if (form.value.mealSelect) {
        pax.mealPreference = form.value.mealSelect;
        this.flightService.getpaxRequiringSpecialMealsMap().set(pax.seatNumber, pax.mealPreference);
      }
    }
    this.appUtilService.opensnackBar('Changes Saved Successfully', '', 2000);
  }

  checkForInFlightServices(pax: Passenger, paxForm: NgForm) {
    console.log(pax);
    if (pax.ancillaryServicesList && pax.ancillaryServicesList.length > 0) {
      paxForm.form.patchValue({
        ancillaries: pax.ancillaryServicesList
      });
    }
    if (pax.inFlightShopReqList) {
      paxForm.form.patchValue({
        shop: pax.inFlightShopReqList
      });
    }
    if (pax.mealPreference) {
      paxForm.form.patchValue({
        mealSelect: pax.mealPreference
      });
    }
  }

  createPax() {
    const dialogRef = this.dialog.open(PassengerComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value && value.length > 0) {
        this.appUtilService.opensnackBar(value, 'OK', 2000);
      }
    });
  }
}

