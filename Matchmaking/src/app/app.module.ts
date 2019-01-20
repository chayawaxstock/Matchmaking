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
import { MatchingComponent } from './components/matching/matching.component';
import { StarRatingModule } from 'angular-star-rating';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { RequestResetComponent } from './components/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/response-reset/response-reset.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { UserService } from './shared/services/user.service';
import { ToastrModule } from 'ngx-toastr';
import { AdminComponent } from './components/admin/admin.component';
import { TableGirlComponent } from './components/table-girl/table-girl.component';
import { TableSonComponent } from './components/table-son/table-son.component';
import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import { DialogEditUserComponent } from './components/dialog-edit-user/dialog-edit-user.component';
import { BarRatingModule } from "ngx-bar-rating";
import { PreferenceComponent } from './components/preference/preference.component';
import { Ng5SliderModule } from 'ng5-slider';

import { DialogPreferenceComponent } from './components/dialog-preference/dialog-preference.component';

@NgModule({
  declarations: [
    AppComponent,
    NewUserProfileComponent,
    SignUpComponent,
    MatchingComponent,
    LoginComponent,
    NavComponent,
    RequestResetComponent,
    ResponseResetComponent,
    AdminComponent,
    TableGirlComponent,
    TableSonComponent,
    DialogBodyComponent,
    DialogDeleteComponent,
    DialogEditUserComponent,

    PreferenceComponent,
    DialogPreferenceComponent,

  ],
  imports: [
    StarRatingModule.forRoot(),
    BarRatingModule,
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
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),// ToastrModule added
    Ng5SliderModule,
  ],
  providers: [AuthGuardService,UserService],
  bootstrap: [AppComponent],
  entryComponents: [DialogBodyComponent,DialogDeleteComponent,DialogEditUserComponent,DialogPreferenceComponent]
})
export class AppModule { }
