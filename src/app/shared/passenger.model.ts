import { AncillaryService } from './enums/AncillaryService.enum';
import { MealPreference } from './enums/MealPreference.enum';
import { InFlightShop } from './enums/InFlightShop.enum';


export interface Passenger {
    name: string;
    passportNumber: string;
    checkinStatus: string;
    passengerType: string;
    seatNumber: string;
    address: Address;
    DOB: string;
    ancillaryServicesList: AncillaryService[];
    mealPreference: MealPreference;
    inFlightShopReqList: InFlightShop[];
}
export interface Address {
    city: string;
    state: string;
    postalCode: string;
}


