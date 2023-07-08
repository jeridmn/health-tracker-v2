import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private firebaseService: FirebaseService){
    
  } 

  ngOnInit(): void {
    console.log(this.firebaseService.isLoggedIn)
    
  }

}
