import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { FirebaseService } from './service/firebase.service';
import { TrackingService } from './service/tracking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'health-tracker';

  constructor(public firebaseService: FirebaseService, private router: Router, private trackingService: TrackingService) {

  }

  ngOnInit(): void {
    this.firebaseService.checkIfLoggedIn()
    this.trackingService.getFoodLog()
  }
}
