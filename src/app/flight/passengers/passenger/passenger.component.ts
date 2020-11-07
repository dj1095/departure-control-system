import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Passenger } from 'src/app/shared/passenger.model';
import { PassengerType } from 'src/app/shared/enums/PassengerType.enum';
import { MealPreference } from 'src/app/shared/enums/MealPreference.enum';
import { MockDataService } from 'src/app/home/mock-data.service';
import { AppUtilService } from 'src/app/app-util.service';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {

  paxForm: FormGroup;
  isPaxUpdate: boolean;
  constructor(private matDiologRef: MatDialogRef<PassengerComponent>,
              private dataService: MockDataService,
              private appUtilService: AppUtilService,
              @Inject(MAT_DIALOG_DATA) public paxData: Passenger) { }

  ngOnInit() {
    this.paxForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required,
      Validators.minLength(2), Validators.pattern('^[a-zA-z ]+$')]),
      dob: new FormControl(null),
      passportNumber: new FormControl(null, Validators.maxLength(7)),
      address: new FormGroup({
        city: new FormControl(null, [Validators.pattern('^[a-zA-z]+$')]),
        state: new FormControl(null, [Validators.pattern('^[a-zA-z]+$')]),
        postalCode: new FormControl(null, [Validators.maxLength(6), Validators.pattern('^[0-9]+$')])
      })
    });
    if (this.paxData) {
      this.autoFill(this.paxData);
      this.isPaxUpdate = true;
    } else {
      this.isPaxUpdate = false;
    }
  }

  autoFill(pax: Passenger) {
    if (pax) {
      if (pax.name) {
        this.paxForm.patchValue({ firstName: pax.name });
      }
      if (pax.passportNumber) {
        if (pax.passportNumber !== '-') {
          this.paxForm.patchValue({ passportNumber: pax.passportNumber });
        }
      }
      if (pax.DOB) {
        const dateOfBirth = new Date(pax.DOB);
        if (dateOfBirth.getTime() === dateOfBirth.getTime()) {
          this.paxForm.patchValue({ dob: dateOfBirth });
        }
      }
      if (pax.address) {
        this.paxForm.patchValue({
          address: {
            city: pax.address.city,
            state: pax.address.state,
            postalCode: pax.address.postalCode
          }
        });
      }
    }
  }

  onSave() {
    const pax = this.paxForm.value;
    if (pax) {
      const passenger: Passenger = {
        name: pax.firstName,
        passportNumber: pax.passportNumber,
        DOB: pax.dob,
        address: pax.address,
        checkinStatus: 'NC',
        passengerType: PassengerType.GN,
        seatNumber: '-',
        ancillaryServicesList: [],
        mealPreference: MealPreference.AVML,
        inFlightShopReqList: []
      };
      this.dataService.getCurrentFlight().passengerList.push(passenger);
      this.appUtilService.opensnackBar('Passenger Added Sucessfully', 'OK', 2000);
      this.paxForm.reset();
      this.matDiologRef.close();
    }
  }

  onUpdate() {
    if (this.paxForm.get('firstName').dirty) {
      this.paxData.name = this.paxForm.get('firstName').value;
    }
    if (this.paxForm.get('passportNumber').dirty) {
      this.paxData.passportNumber = this.paxForm.get('passportNumber').value;
    }
    if (this.paxForm.get('dob').dirty) {
      this.paxData.DOB = this.paxForm.get('dob').value;
    }
    if (this.paxForm.get('address').get('city').dirty) {
      this.paxData.address.city = this.paxForm.get('address').get('city').value;
    }
    if (this.paxForm.get('address').get('state').dirty) {
      this.paxData.address.state = this.paxForm.get('address').get('state').value;
    }
    if (this.paxForm.get('address').get('postalCode').dirty) {
      this.paxData.address.postalCode = this.paxForm.get('address').get('postalCode').value;
    }
    this.paxForm.reset();
    this.appUtilService.opensnackBar('Updated Sucessfully', 'OK', 2000);
    this.matDiologRef.close();
  }

  onCancel() {
    this.paxForm.reset();
    this.matDiologRef.close();
  }

}
