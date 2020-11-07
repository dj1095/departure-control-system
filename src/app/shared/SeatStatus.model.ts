export class SeatStatus {
    seatNumber: string;
    checkInStatus: string;
    isWheelChair: boolean;
    isInfantAssociated: boolean;
    constructor(seatNumberParam: string, checkInStatusParam: string, isWheelChairParam: boolean, isInfantAssoiciatedParam: boolean) {
        this.seatNumber = seatNumberParam;
        this.checkInStatus = checkInStatusParam;
        this.isWheelChair = isWheelChairParam;
        this.isInfantAssociated = isInfantAssoiciatedParam;
    }
}
