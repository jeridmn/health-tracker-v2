import { EventEmitter, Injectable, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendSignInLinkToEmail, UserCredential } from "firebase/auth";
import { MessageService } from 'primeng/api';
import { FoodLog } from '../models/FoodLog';
import { nanoid } from 'nanoid';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
    uid = localStorage.getItem('UID')
    

    userFoodLog: FoodLog[] = []
  
    constructor(
    private router: Router, 
    private messageService: MessageService,
    private http: HttpClient)  { 

  }

  getFoodLog() {
    this.userFoodLog = []
    this.http.get(`http://localhost:3000/tracking/foodlog/history/${this.uid}`).subscribe((response: any) => {
        for(var i = 0; i < response.length; i++) {
            this.userFoodLog.push(new FoodLog(
                response[i].name,
                response[i].calories,
                response[i].fat,
                response[i].carbs,
                response[i].protein,
                response[i].created_at,
                response[i].id
            ))

        }
    })

  }

  addFoodLog(foodLog: FoodLog) {
    const calories = foodLog.calories
    const fat = foodLog.fat
    const carbs = foodLog.carbs
    const protein = foodLog.protein
    const uid = localStorage.getItem('UID')
    const timeAdded = new Date()
    const foodLogID = nanoid(5)
    console.log(foodLogID)
    var name = ''

    if(foodLog.name != '')
        name = foodLog.name
    else
        name = 'Quick Add'


    this.http.post('http://localhost:3000/tracking/foodlog', {calories, fat, carbs, protein, uid, timeAdded, name, foodLogID}).subscribe({
        next: () => {
            console.log('Food added to database')
            this.getFoodLog()
        }
    }
    )

    
  }

  deleteFoodLog(foodLogID: string) {
    this.http.delete(`http://localhost:3000/tracking/foodlog/${foodLogID}`).subscribe({
  next: () => {
    console.log("Food log deleted.");
    this.getFoodLog();
  },
  error: (error) => {
    console.log(error);
  }
});
  }
  
}
