import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MockDataService } from 'src/app/home/mock-data.service';
import { FlightService } from '../flight.service';
import { SeatStatus } from 'src/app/shared/seatStatus.model';
import { SeatMapService } from './seat-map.service';
import { SeatCheckinComponent } from './seat-checkin/seat-checkin.component';
import { AppUtilService } from 'src/app/app-util.service';
import { Subject } from 'rxjs';
import { Passenger } from 'src/app/shared/passenger.model';

@Component({
  selector: 'app-seat-map',
  templateUrl: './seat-map.component.html',
  styleUrls: ['./seat-map.component.css']
})
export class SeatMapComponent implements OnInit {

  constructor(
    private dataService: MockDataService,
    private flightService: FlightService,
    private seatMapService: SeatMapService,
    private dialog: MatDialog,
    private appUtilService: AppUtilService) {
  }
  totalSeats: number[] = this.seatMapService.getTotalSeats();
  seatsOccupied: SeatStatus[] = null;
  availableSeats = this.seatMapService.getseatsAvailable();
  occupiedSeatsStatus = this.flightService.getSeatsOccupied();


  getColorCodes(seatNumber: string) {
    return this.flightService.getcheckedInPassenegersMap().get(seatNumber.toString());
  }

  getToolTipMsg(seatNumber) {
    const pax = this.flightService.getseatNumberWithPaxMap().get(seatNumber.toString());
    if (pax) {
      return pax.name;
    }
  }


  ngOnInit() {
    this.seatMapService.getSeatMapLoaded().next(true);
  }

  onSeatClick(seatNumberParam: string) {
    const dialogRef = this.dialog.open(SeatCheckinComponent, {
      height: '400px',
      width: '600px',
      data: { seatNumber: seatNumberParam }
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value && value.length > 0) {
        this.appUtilService.opensnackBar(value, 'OK', 2000);
      }
    });
  }

}
