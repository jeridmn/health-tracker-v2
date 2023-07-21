import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { nanoid } from 'nanoid';
import { FoodLog } from 'src/app/models/FoodLog';
import { WeightLog } from 'src/app/models/WeightLog';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { TrackingService } from 'src/app/service/tracking.service';

@Component({
  selector: 'app-weight-track',
  templateUrl: './weight-track.component.html',
  styleUrls: ['./weight-track.component.css']
})
export class WeightTrackComponent {
  weightLog: WeightLog[]
  logWeight = new FormControl('')
  dateOptions = {
    month: "long",
    day: "numeric",
    year: "numeric"
  }
  
  constructor(public trackingService: TrackingService, public localStorageService: LocalStorageService) {

  }

  ngOnInit(): void {
    this.weightLog = this.localStorageService.getData('weightLogs')
    this.trackingService.logsChanged.subscribe(() => {
      this.weightLog = this.localStorageService.getData('weightLogs')
    })
  }

  onAdd() {
    const weightID = nanoid(5)  
    this.trackingService.addWeightLog(new WeightLog(
      +this.logWeight.value, 
      weightID, 
      null
))
  }

 
}
