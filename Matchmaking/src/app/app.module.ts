import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewUserProfileComponent } from './components/new-user-profile/new-user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule,MatStepperModule,MatFormFieldModule, MatAutocompleteModule, MatButtonToggleModule, MatCardModule, 
  MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule,
   MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule,
    MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,
     MatToolbarModule, MatTooltipModule} 
     from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { MatchingComponent } from './components/matching/matching.component';
import { StarRatingModule } from 'angular-star-rating';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { RequestResetComponent } from './components/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/response-reset/response-reset.component';
import { EditUserProfileComponent } from './components/edit-user-profile/edit-user-profile.component';
import { TableGirlComponent } from './components/table-girl/table-girl.component';
import { TableSonComponent } from './components/table-son/table-son.component';

@NgModule({
  declarations: [
    AppComponent,
    NewUserProfileComponent,
    SignUpComponent,
    EditUserComponent,
    LogOutComponent,
    MatchingComponent,
    LoginComponent,
    NavComponent,
    RequestResetComponent,
    ResponseResetComponent,
    EditUserProfileComponent,
    TableGirlComponent,
    TableSonComponent,

  ],
  imports: [
    StarRatingModule.forRoot(),
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    MatCheckboxModule,
    MatStepperModule,
    MatFormFieldModule,
    CdkStepperModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
