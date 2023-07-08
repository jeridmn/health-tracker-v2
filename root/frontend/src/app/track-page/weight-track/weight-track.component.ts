import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FoodLog } from 'src/app/models/FoodLog';
import { TrackingService } from 'src/app/service/tracking.service';

@Component({
  selector: 'app-weight-track',
  templateUrl: './weight-track.component.html',
  styleUrls: ['./weight-track.component.css']
})
export class WeightTrackComponent {
  foodLog: FoodLog
  logName = new FormControl('')
  logCalories = new FormControl('')
  logFat = new FormControl('')
  logCarbs = new FormControl('')
  logProtein = new FormControl('')
  date = new Date()
  
  constructor(private trackingService: TrackingService) {

  }

  ngOnInit(): void {
  }
  
  onSubmit() {
    
  }

  onAdd() {
    this.trackingService.addFoodLog(new FoodLog(this.logName.value,
      +this.logCalories.value,
      +this.logFat.value,
      +this.logCarbs.value, 
      +this.logProtein.value,
       null,
       null))
  }
}
