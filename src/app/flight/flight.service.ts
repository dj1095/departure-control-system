import { Injectable } from '@angular/core';
import { Passenger } from '../shared/passenger.model';
import { MockDataService } from '../home/mock-data.service';
import { SeatStatus } from '../shared/seatStatus.model';
import { Flight } from '../shared/flight.model';
import { SeatMapService } from './seat-map/seat-map.service';
import { PassengerType } from '../shared/enums/PassengerType.enum';
import { CheckinStatus } from '../shared/enums/CheckinStatus.enum';

@Injectable({
    providedIn: 'root'
})
export class FlightService {

    constructor(private dataService: MockDataService, private seatMapService: SeatMapService) { }

    private seatsOccupied: SeatStatus[] = [];
    private totalSeats: number[] = [...Array(36).keys()];
    private currentFlight: Flight = null;
    private checkedInPassenegersMap = new Map<string, PassengerType>();
    private paxRequiringSpecialMealsMap = new Map<string, string>();
    private seatNumberWithPaxMap = new Map<string, Passenger>();

    removeSeatAllocated(seatNumber: string) {
        const occupiedSeatsSatus = this.getSeatsOccupied();
        occupiedSeatsSatus.forEach((seat, arrIndex) => {
            if (seatNumber === seat.seatNumber) {
                occupiedSeatsSatus.splice(arrIndex, 1);
                this.seatMapService.getseatsAvailable().splice(Number(seatNumber) - 1, 1, Number(seatNumber));
                this.getcheckedInPassenegersMap().delete(seatNumber);
                this.getpaxRequiringSpecialMealsMap().delete(seatNumber);
                this.getseatNumberWithPaxMap().delete(seatNumber);
                return;
            }
        });

    }

    assignSeat(pax: Passenger) {
        const occupiedSeatsSatus = this.getSeatsOccupied();
        const totalSeats = this.seatMapService.getTotalSeats();
        if (this.isNumericValue(pax.seatNumber) && this.seatMapService.isSeatAvailable(Number(pax.seatNumber))) {
            const seatStatus: SeatStatus = this.constructSeatStatus(pax);
            occupiedSeatsSatus.push(seatStatus);
            this.seatMapService.getseatsAvailable().splice(Number(pax.seatNumber) - 1, 1, -1);
        } else {
            const seats: string[] = occupiedSeatsSatus.map(seat => seat.seatNumber);
            for (const availableSeat of totalSeats) {
                if (!(seats.includes(availableSeat.toString()))) {
                    pax.seatNumber = availableSeat.toString();
                    const seatStatus: SeatStatus = this.constructSeatStatus(pax, availableSeat.toString());
                    occupiedSeatsSatus.push(seatStatus);
                    this.seatMapService.getseatsAvailable().splice(availableSeat - 1, 1, -1);
                    break;
                }
            }
        }
        this.getseatNumberWithPaxMap().set(pax.seatNumber, pax);

    }

    public constructSeatStatus(pax: Passenger, seatNumber?: string, ): SeatStatus {
        const isWheelChairPax: boolean = (pax.passengerType === 'WC') ? true : false;
        const isInfantAssociated: boolean = (pax.passengerType === 'INF') ? true : false;
        if (pax.checkinStatus === CheckinStatus.AC.toString()) {
            if (pax.passengerType === PassengerType.INF.toString()) {
                this.getcheckedInPassenegersMap().set(pax.seatNumber, PassengerType.INFANT_ASSOCIATED);
            } else if (pax.passengerType === PassengerType.WC.toString()) {
                this.getcheckedInPassenegersMap().set(pax.seatNumber, PassengerType.WHEEL_CHAIR);
            } else {
                this.getcheckedInPassenegersMap().set(pax.seatNumber, PassengerType.CHECKED_IN);
            }
            const mealPreference: string = (pax.mealPreference) ? pax.mealPreference : '';
            this.getpaxRequiringSpecialMealsMap().set(pax.seatNumber, mealPreference);
        }
        return new SeatStatus(pax.seatNumber, pax.checkinStatus, isWheelChairPax, isInfantAssociated);
    }

    public isNumericValue(numberParam) {
        const num = Number(numberParam);
        return num === num;
    }

    public getCurrentFlight() {
        return this.currentFlight;
    }
    public setCurrentFlight(flight: Flight) {
        this.currentFlight = flight;
    }
    public getSeatsOccupied(): SeatStatus[] {
        return this.seatsOccupied;
    }
    public setSeatsOccupied(seatsOccupiedArr: SeatStatus[]) {
        this.seatsOccupied = seatsOccupiedArr;
    }
    public getcheckedInPassenegersMap() {
        return this.checkedInPassenegersMap;
    }
    public setcheckedInPassenegersMap(checkedInPassenegersMapParam: Map<string, PassengerType>) {
        this.checkedInPassenegersMap = checkedInPassenegersMapParam;
    }
    public getpaxRequiringSpecialMealsMap() {
        return this.paxRequiringSpecialMealsMap;
    }
    public setpaxRequiringSpecialMealsMap(paxRequiringSpecialMealsMapParam: Map<string, string>) {
        this.paxRequiringSpecialMealsMap = paxRequiringSpecialMealsMapParam;
    }
    public getseatNumberWithPaxMap() {
        return this.seatNumberWithPaxMap;
    }
    public setseatNumberWithPaxMap(paxRequiringSpecialMealsMapParam: Map<string, Passenger>) {
        this.seatNumberWithPaxMap = paxRequiringSpecialMealsMapParam;
    }


}


