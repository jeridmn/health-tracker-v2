import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { FoodLog } from '../models/FoodLog';
import { LocalStorageService } from '../service/local-storage.service';
import { TrackingService } from '../service/tracking.service';


@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit{
  foodLogMethods: MenuItem[] = []
  selectedDate: Date
  currentDate = new Date()
  quickAddSelected = true;
  foodLog: FoodLog[] = []
  filters = {
    name: 'Quick Add'
  }

  constructor(
    private router: Router, 
    private currentRoute: ActivatedRoute, 
    public trackingService: TrackingService,
    public localStorageService: LocalStorageService,) {
    
  }

  ngOnInit(): void {
    this.selectedDate = new Date()
    this.foodLog = this.localStorageService.getData('foodLogs')
    this.trackingService.logsChanged.subscribe(() => {
      this.foodLog = this.localStorageService.getData('foodLogs')

    })
    this.foodLogMethods = [
      {
        label: 'Quick Add',
        icon: 'pi pi-pencil',
        command: (() => {
          this.quickAddSelected = true;
        })
      },
      {
        label: 'Search',
        icon: 'pi pi-search',
        command: (() => {
          this.quickAddSelected = false;
        })
      }
    ]

  }

  onIncrementDay() {
    this.selectedDate.setDate(this.selectedDate.getDate() + 1)
    this.selectedDate = new Date(this.selectedDate)
    console.log(this.currentDate)
  }

  onDecrementDay() {
    this.selectedDate.setDate(this.selectedDate.getDate() - 1)
    this.selectedDate = new Date(this.selectedDate)
  }

  test(thing: any) {
    console.log(this.selectedDate.getDate())
  }

  getLogDate(date: string) {
    return new Date(date).getDate()
  }
  

}
