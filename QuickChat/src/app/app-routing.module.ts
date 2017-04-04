import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './+main/main.component';
import { SigninComponent } from './+signin/signin.component';
import { MypostComponent } from './+mypost/mypost.component';

const routes: Routes = [
  {path: '', component: MainComponent, pathMatch: 'full', canActivate: [AuthGuardService]},
  {path: 'signin', component: SigninComponent},
  {path: 'myposts', component: MypostComponent, canActivate: [AuthGuardService]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
