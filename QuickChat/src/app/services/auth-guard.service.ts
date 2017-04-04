import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from "app/services/auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {
    
  constructor(private authService: AuthService, private router: Router) { }

    
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.loggedinStream.map<boolean, boolean>( (isSignedIn: boolean) => {
      if (!isSignedIn){
        this.router.navigate(["./signin"])
      }
      return isSignedIn
    })
  }
}
