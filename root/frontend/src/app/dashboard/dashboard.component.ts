import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../service/firebase.service';
import { TrackingService } from '../service/tracking.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private firebaseService: FirebaseService,
    private trackingService: TrackingService){
    
  } 

  ngOnInit(): void {
    console.log(this.firebaseService.isLoggedIn)
    this.trackingService.getFoodLog() 
    this.trackingService.getWeightLog() 
    
  }

}
