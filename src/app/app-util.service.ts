import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AppUtilService {

  constructor(private snackBar: MatSnackBar) { }


  opensnackBar(message: string, action: string, delay: number) {
    this.snackBar.open(message, action, {
      duration: delay,
    });

  }
}
