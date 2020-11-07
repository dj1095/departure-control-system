import { NgModule } from '@angular/core';
import {
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatGridListModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatExpansionModule,
    MatListModule
} from '@angular/material';

const materialModules = [
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatGridListModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTabsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatExpansionModule,
    MatListModule
];
@NgModule({
    imports: [materialModules],
    exports: [materialModules]

})
export class AngularMaterialModule {

}


