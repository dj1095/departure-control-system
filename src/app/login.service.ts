import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { User } from './shared/user.model';

export interface UserLogInStatus {
  userName: string;
  role: string;
  loginStatus: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  seatMapService = new EventEmitter<boolean>();
  loginSucessful = new BehaviorSubject<UserLogInStatus>(null);
  private loggedInUser: UserLogInStatus;
  constructor(private http: HttpClient) { }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/assets/data/users.json');
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  setLoggedInUser(user: UserLogInStatus) {
    this.loggedInUser = user;
  }

}
