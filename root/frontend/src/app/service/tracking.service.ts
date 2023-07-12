import { EventEmitter, Injectable, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendSignInLinkToEmail, UserCredential } from "firebase/auth";
import { MessageService } from 'primeng/api';
import { FoodLog } from '../models/FoodLog';
import { nanoid } from 'nanoid';
import { FirebaseService } from './firebase.service';
import { WeightLog } from '../models/WeightLog';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
    userFoodLog: FoodLog[] = []
    userWeightLog: WeightLog[] = []
  
    constructor(
    private router: Router, 
    private messageService: MessageService,
    private http: HttpClient,
    private firebaseService: FirebaseService,
    private localStorageService: LocalStorageService)  { 

  }

  getFoodLog() {
    const uid = this.firebaseService.currentUID

    this.userFoodLog = []
    this.http.get(`http://localhost:3000/tracking/foodlog/history/${uid}`).subscribe((response: any) => {
      for(var i = 0; i < response.length; i++) {
        this.userFoodLog.push(new FoodLog(
          response[i].name,
          response[i].calories,
          response[i].fat,
          response[i].carbs,
          response[i].protein,
          new Date(response[i].created_at),
          response[i].id
        ))
        }
        this.localStorageService.setData('foodLogs', this.userFoodLog)
    })

  }

  addFoodLog(foodLog: FoodLog) {
    const calories = foodLog.calories
    const fat = foodLog.fat
    const carbs = foodLog.carbs
    const protein = foodLog.protein
    const uid = this.firebaseService.currentUID
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
    })
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

  addWeightLog(weightLog: WeightLog) {
    const weight = weightLog.weight
    const uid = this.firebaseService.currentUID
    const timeAdded = new Date()
    const weightLogID = nanoid(5)
    var name = ''

    this.http.post('http://localhost:3000/tracking/weights/add-weight', {weight,  uid, timeAdded,  weightLogID}).subscribe({
      next: () => {
        console.log('weight added to database')
        this.getWeightLog()
      }
    })
  }

  getWeightLog() {
    const uid = this.firebaseService.currentUID
    this.userWeightLog = []

    this.http.get(`http://localhost:3000/tracking/weights/get-weights/${uid}`).subscribe((response: any) => {
      for(var i = 0; i < response.length; i++) {
        this.userWeightLog.push(new WeightLog(
          response[i].weight,
          response[i].id,
          new Date(response[i].date)
        ))
      }
      this.localStorageService.setData('weightLogs', this.userWeightLog)
    })
  }

  deleteWeightLog(weightLogID: string) {
    this.http.delete(`http://localhost:3000/tracking/weights/delete-weight/${weightLogID}`).subscribe({
      next: () => {
      console.log("Weight log deleted.");
        this.getWeightLog();
       },
      error: (error) => {
        console.log(error);
        }
    });
  }
  
}
