import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupComponent } from './login-page/signup/signup.component';
import { QuickAddComponent } from './track-page/quick-add/quick-add.component';
import { SearchComponent } from './track-page/search/search.component';
import { TrackPageComponent } from './track-page/track-page.component';

const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'tracking', component: TrackPageComponent},
  {path: '**', component: LoginPageComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
