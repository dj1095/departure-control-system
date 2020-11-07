import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FlightComponent } from './flight/flight.component';
import { SeatMapComponent } from './flight/seat-map/seat-map.component';
import { HomeComponent } from './home/home.component';
import { PassengersComponent } from './flight/passengers/passengers.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './header/header.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { AppRoutingModule } from './appRouting.module';
import { AngularMaterialModule } from './angularMaterial.module';
import { AuthComponent } from './auth/auth.component';
import { SeatCheckinComponent } from './flight/seat-map/seat-checkin/seat-checkin.component';
import { DropDownDirective } from './shared/custom-directives/dropdown.directive';
import { InFlightComponent } from './flight/in-flight/in-flight.component';
import { PassengerComponent } from './flight/passengers/passenger/passenger.component';
import { ServiceWorkerModule } from '@angular/service-worker';



const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('1013527445579-120f8t62g62mlbbc9bn9k5cvsm637j5d.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('557667174610546')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    FlightComponent,
    SeatMapComponent,
    HomeComponent,
    PassengersComponent,
    PageNotFoundComponent,
    HeaderComponent,
    AuthComponent,
    SeatCheckinComponent,
    InFlightComponent,
    DropDownDirective,
    PassengerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocialLoginModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  entryComponents: [SeatCheckinComponent, PassengerComponent],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
