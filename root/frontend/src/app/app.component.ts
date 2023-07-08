import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { FirebaseService } from './service/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'health-tracker';

  constructor(public firebaseService: FirebaseService) {

  }

  ngOnInit(): void {
    this.firebaseService.checkIfLoggedIn()
  }
}
