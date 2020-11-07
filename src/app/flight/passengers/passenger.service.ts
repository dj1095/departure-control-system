import { Injectable } from '@angular/core';
import { MockDataService } from 'src/app/home/mock-data.service';
import { Passenger } from 'src/app/shared/passenger.model';
import { CheckinStatus } from 'src/app/shared/enums/CheckinStatus.enum';
import { PassengerType } from 'src/app/shared/enums/PassengerType.enum';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  constructor(private dataService: MockDataService) { }

  getPassengerListByStatus(checkinStatus: CheckinStatus): Passenger[] {
    const passengerList: Passenger[] = this.dataService.getCurrentFlight().passengerList;
    return passengerList.filter(passenger => {
      if (passenger.checkinStatus === checkinStatus.toString()) {
        return passenger;
      }
    });
  }

  getPassengerListByPaxType(passengerType: PassengerType): Passenger[] {
    const passengerList: Passenger[] = this.dataService.getCurrentFlight().passengerList;
    return passengerList.filter(passenger => {
      if (passenger.passengerType === passengerType.toString()) {
        return passenger;
      }
    });
  }

  getAcceptedPaxListByPaxType(passengerType: PassengerType): Passenger[] {
    const passengerList: Passenger[] = this.dataService.getCurrentFlight().passengerList;
    return passengerList.filter(passenger => {
      if (passenger.checkinStatus === CheckinStatus.AC.toString()
        && passenger.passengerType === passengerType.toString()) {
        return passenger;
      }
    });
  }

}


