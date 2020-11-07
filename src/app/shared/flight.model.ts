import { Passenger } from './passenger.model';

export interface Flight {
    flightNumber: string;
    departureDate: string;
    arrivalDate: string;
    departureStation: string;
    arrivalStation: string;
    departureTime: string;
    arrivalTime: string;
    passengerList: Array<Passenger>;
}
