import { AuthorService } from './author.service';
import { ComponentFixture } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { AngularFireAuth, FirebaseAuthState, AuthProviders, AuthMethods } from "angularfire2";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {
  private _currentUserId: string

  constructor(private afAuth: AngularFireAuth, private router: Router, private authorService: AuthorService) { 
    afAuth.subscribe( (authState: FirebaseAuthState) => {
      if(authState) {
        this._currentUserId = authState.uid
        console.log(authState)
        this.authorService.updateAuthor(
          authState.uid, 
          authState.google.displayName, 
          authState.google.photoURL
        )
      } else {
        this._currentUserId = ""
      }
    })
  }

  get currentUserId(): string {
    return this._currentUserId
  }

  get loggedinStream(): Observable<boolean> {
    return this.afAuth.map<FirebaseAuthState, boolean>( (authState: FirebaseAuthState) => {
      return authState != null
    })
  }

  get displayNameStream(): Observable<string> {
    return this.afAuth.map<FirebaseAuthState, string>( (authState: FirebaseAuthState) => {
      if(authState){
        return authState.google.displayName
      }
      return null
    })
  }

  get displayPictureStream(): Observable<string> {
    return this.afAuth.map<FirebaseAuthState, string>( (authState: FirebaseAuthState) => {
      if(authState){
        return authState.google.photoURL
      }
      return null
    })
  }

  signinWithGoogle() {
    this.afAuth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }).then((authState: FirebaseAuthState) => {
      if(authState){
        this.router.navigate(["/"])
      }
    })
  }

    signoutWithGoogle() {
      this.afAuth.logout();
      this.router.navigate(["/signin"]);
  }

}
