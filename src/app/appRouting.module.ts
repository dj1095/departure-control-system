import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FlightComponent } from './flight/flight.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SeatMapComponent } from './flight/seat-map/seat-map.component';
import { PassengersComponent } from './flight/passengers/passengers.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { InFlightComponent } from './flight/in-flight/in-flight.component';

// All Roues in the application
const appRoutes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  {
    path: 'flights/:flightNumber', canActivate: [AuthGuard], component: FlightComponent, children: [{
      path: 'passengers', component: PassengersComponent
    },
    { path: 'seat-map', component: SeatMapComponent },
    { path: 'in-Flight', canActivate: [AuthGuard], component: InFlightComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
