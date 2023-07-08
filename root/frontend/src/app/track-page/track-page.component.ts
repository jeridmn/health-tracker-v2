import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
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


  constructor(private router: Router, private currentRoute: ActivatedRoute, public trackingService: TrackingService) {
    
  }

  ngOnInit(): void {
    this.trackingService.getFoodLog()
    this.foodLogMethods = [
      {
        label: 'Quick Add',
        icon: 'pi pi-pencil',
        command: (() => {
          this.router.navigate(['quick-add'], {relativeTo: this.currentRoute})
        })
      },
      {
        label: 'Search',
        icon: 'pi pi-search',
        command: (() => {
          this.router.navigate(['search'], {relativeTo: this.currentRoute})
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
  

}
