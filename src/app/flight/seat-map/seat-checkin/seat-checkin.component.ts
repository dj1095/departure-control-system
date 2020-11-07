import { Component, OnInit, Inject } from '@angular/core';
import { PassengerService } from '../../passengers/passenger.service';
import { PassengerType } from 'src/app/shared/enums/PassengerType.enum';
import { CheckinStatus } from 'src/app/shared/enums/CheckinStatus.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SeatMapService } from '../seat-map.service';
import { FlightService } from '../../flight.service';
import { Passenger } from 'src/app/shared/passenger.model';
import { NgForm } from '@angular/forms';
import { AppUtilService } from 'src/app/app-util.service';

@Component({
  selector: 'app-seat-checkin',
  templateUrl: './seat-checkin.component.html',
  styleUrls: ['./seat-checkin.component.css']
})
export class SeatCheckinComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { seatNumber: string },
              public dialogRef: MatDialogRef<SeatCheckinComponent>,
              private paxService: PassengerService,
              private seatMapService: SeatMapService,
              private flightService: FlightService,
              private appUtilService: AppUtilService) { }


  isCheckedInPaxMode = false;
  paxList: Passenger[] = null;
  selectedPax: Passenger;
  paxInfo;


  ngOnInit() {
    if (this.flightService.isNumericValue(this.data.seatNumber)
      && !this.seatMapService.isSeatAvailable(Number(this.data.seatNumber))) {
      this.isCheckedInPaxMode = true;
      this.paxList = this.paxService.getPassengerListByStatus(CheckinStatus.AC).filter(pax => {
        if (pax.seatNumber === this.data.seatNumber.toString()) {
          return pax;
        }
      });
    } else {
      this.paxList = this.paxService.getPassengerListByStatus(CheckinStatus.NC);
    }
  }

  onCheckin(selectedPax: Passenger) {
    if (selectedPax) {
      selectedPax.checkinStatus = 'AC';
      selectedPax.seatNumber = this.data.seatNumber.toString();
      this.flightService.assignSeat(selectedPax);
      this.dialogRef.close('Checkin Sucessful');
    }
  }

  onOffload(selectedPax: Passenger) {
    if (selectedPax) {
      selectedPax.checkinStatus = 'NC';
      this.flightService.removeSeatAllocated(selectedPax.seatNumber);
      selectedPax.seatNumber = '-';
      this.dialogRef.close('Passenger Offload Sucessful');
    }

  }

  onSubmit(form: NgForm) {
    console.log(form);
  }



}
