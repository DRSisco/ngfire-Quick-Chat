import { AuthorService } from './services/author.service';
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
import { CreatePostComponent } from './create-post/create-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostEntryComponent } from './post-entry/post-entry.component';
import { PostEntryService } from "app/services/post-entry.service";
import { ReversePipe } from './reverse.pipe';
 

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SigninComponent,
    MypostComponent,
    CreatePostComponent,
    PostListComponent,
    PostEntryComponent,
    ReversePipe
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
  providers: [AuthService, AuthGuardService, PostEntryService, AuthorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
