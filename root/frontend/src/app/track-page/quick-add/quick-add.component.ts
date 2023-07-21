import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FoodLog } from 'src/app/models/FoodLog';
import { TrackingService } from 'src/app/service/tracking.service';

@Component({
  selector: 'app-quick-add',
  templateUrl: './quick-add.component.html',
  styleUrls: ['./quick-add.component.css']
})
export class QuickAddComponent implements OnInit{
  foodLog: FoodLog
  logName = new FormControl('')
  logCalories = new FormControl('')
  logFat = new FormControl('')
  logCarbs = new FormControl('')
  logProtein = new FormControl('')
  logDate = new Date()
  
  
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
      this.logDate,
       null))
  }
}
