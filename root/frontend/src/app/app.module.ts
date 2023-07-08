import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu'
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component'
import { FlexLayoutModule } from '@angular/flex-layout';
import { TrackPageComponent } from './track-page/track-page.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { QuickAddComponent } from './track-page/quick-add/quick-add.component';
import { SearchComponent } from './track-page/search/search.component';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { environment } from 'src/environments/environment.development';
import { SignupComponent } from './login-page/signup/signup.component';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { WeightTrackComponent } from './track-page/weight-track/weight-track.component';

const firebaseConfig = {
  apiKey: "AIzaSyBVikIhnSHdLZykiAfzdGnbrGb4woLFjLY",
  authDomain: "healthtracker-6f263.firebaseapp.com",
  projectId: "healthtracker-6f263",
  storageBucket: "healthtracker-6f263.appspot.com",
  messagingSenderId: "341996692029",
  appId: "1:341996692029:web:e33e0185c7b01cd11c8054",
  measurementId: "G-DMLLS5S2N1"
};


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    TrackPageComponent,
    QuickAddComponent,
    SearchComponent,
    LoginPageComponent,
    SignupComponent,
    WeightTrackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MenuModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MenubarModule,
    TabMenuModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    ReactiveFormsModule,
    ToastModule,
    HttpClientModule,
    CalendarModule,
    FormsModule,
    TableModule
  ],
  providers: [MessageService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
