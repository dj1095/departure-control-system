import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatMapService {

  constructor() { }
  private totalSeats: number[] = [...Array(37).keys()].slice(1);
  private seatsAvailable: number[] = null;
  private seatMapLoaded = new Subject<boolean>();

  public getSeatMapLoaded(): Subject<boolean> {
    return this.seatMapLoaded;
  }
  public getTotalSeats(): number[] {
    return this.totalSeats;
  }
  public getseatsAvailable(): number[] {
    if (!this.seatsAvailable) {
      this.seatsAvailable = [...Array(37).keys()].slice(1);
    }
    return this.seatsAvailable;
  }
  public setseatsAvailable(seatsAvailableParam: number[]) {
    this.seatsAvailable = seatsAvailableParam;
  }

  public isSeatAvailable(seatNumber: number): boolean {
    return this.getseatsAvailable().includes(seatNumber);
  }
}
