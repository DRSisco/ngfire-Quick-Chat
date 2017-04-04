import { AuthGuardService } from './services/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from "../environments/environment";
import { FlexLayoutModule } from "@angular/flex-layout"
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import { MainComponent } from './+main/main.component';
import { SigninComponent } from './+signin/signin.component';
import { MypostComponent } from './+mypost/mypost.component';
import { AuthService } from "app/services/auth.service";
 

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SigninComponent,
    MypostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
