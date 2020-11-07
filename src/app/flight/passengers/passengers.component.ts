import { Component, OnInit, Input } from '@angular/core';
import { Passenger } from 'src/app/shared/passenger.model';
import { MockDataService } from 'src/app/home/mock-data.service';
import { FlightService } from '../flight.service';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { SeatMapService } from '../seat-map/seat-map.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { PassengerService } from './passenger.service';
import { PassengerType } from 'src/app/shared/enums/PassengerType.enum';
import { CheckinStatus } from 'src/app/shared/enums/CheckinStatus.enum';
import { AppUtilService } from 'src/app/app-util.service';
import { LoginService } from 'src/app/login.service';
import { PassengerComponent } from './passenger/passenger.component';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {

  allPaxList: Passenger[];
  filteredPaxList: Passenger[] = [];
  isAdminMode: boolean;
  constructor(
    private dataService: MockDataService,
    private flightService: FlightService,
    private seatMapService: SeatMapService,
    private appUtilService: AppUtilService,
    private paxService: PassengerService,
    private loginService: LoginService,
    private matDialog: MatDialog) { }

  ngOnInit() {
    const currentUser = this.loginService.getLoggedInUser();
    this.isAdminMode = (currentUser && currentUser.role === 'admin') ? true : false;
    console.log(this.isAdminMode);
    console.log(currentUser);
  }


  @Input() public set checkinStatus(param) {
    this.fllilterPaxByStatus(param);
  }

  onSeatUpdate(passenger: Passenger, seatUpdateform: NgForm) {
    let snackBarMessage = '';
    const requestedSeat: string = seatUpdateform.value.seatNumber;
    const allocatedSeat = passenger.seatNumber;
    if (requestedSeat === allocatedSeat) {
      this.appUtilService.opensnackBar('No Changes Made', 'OK', 2000);
      return;
    }
    if (this.seatMapService.isSeatAvailable(Number(requestedSeat))) {
      passenger.seatNumber = requestedSeat;
      this.flightService.removeSeatAllocated(allocatedSeat);
      this.flightService.assignSeat(passenger);
      snackBarMessage = 'seat Update Successful!';
    } else {
      seatUpdateform.form.patchValue({
        seatNumber: allocatedSeat
      });
      snackBarMessage = 'seat Update Failed!';
    }
    this.appUtilService.opensnackBar(snackBarMessage, 'OK', 2000);
  }



  fllilterPaxByStatus(checkinStatus: string) {
    this.filteredPaxList = [];
    const flight = this.dataService.getCurrentFlight();
    this.allPaxList = flight.passengerList;
    switch (!!checkinStatus) {
      case (checkinStatus === 'AC' || checkinStatus === 'NC'): this.allPaxList.forEach(el => {
        if (checkinStatus === el.checkinStatus) {
          this.filteredPaxList.push(el);
        }
      });
                                                               break;
      case (checkinStatus === 'WC' || checkinStatus === 'INF'): this.allPaxList.forEach(el => {
        if (checkinStatus === el.passengerType) {
          this.filteredPaxList.push(el);
        }
      });
                                                                break;
      case (checkinStatus === 'ALL'): this.filteredPaxList = this.allPaxList;
                                      break;

      case (checkinStatus === 'PSPT'): this.allPaxList.forEach(el => {
        if (!el.passportNumber || el.passportNumber === '-') {
          this.filteredPaxList.push(el);
        }
      });
                                       break;
      case (checkinStatus === 'Address'): this.allPaxList.forEach(el => {
        if (!el.address.city || !el.address.postalCode || !el.address.state) {
          this.filteredPaxList.push(el);
        }
      });
                                          break;

      case (checkinStatus === 'DOB'): this.allPaxList.forEach(el => {
        if (!el.DOB || el.DOB === '-') {
          this.filteredPaxList.push(el);
        }
      });
                                      break;
      default: break;
    }

  }



  onOffload(pax: Passenger) {
    pax.checkinStatus = 'NC';
    this.flightService.removeSeatAllocated(pax.seatNumber);
    pax.seatNumber = '-';
    this.appUtilService.opensnackBar('Passenger Offload Sucessful', 'OK', 2000);

  }

  onCheckin(pax: Passenger) {
    pax.checkinStatus = 'AC';
    this.flightService.assignSeat(pax);
    this.appUtilService.opensnackBar('Checkin Sucessful', 'OK', 2000);
  }

  openPax(pax: Passenger) {
    this.matDialog.open(PassengerComponent, {
      width: '600px',
      height: '400px',
      data: pax
    });
  }




}
