import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FoodLog } from 'src/app/models/FoodLog';
import { FoodResult } from 'src/app/models/FoodResult';
import { TrackingService } from 'src/app/service/tracking.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() selectedResult: FoodResult;
  addedResult: FoodLog;
  grams = 100;
  quantity = 1;

  constructor(private trackingService: TrackingService,
    private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.selectedResult = {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
    
  }

  addFood() {
    this.addedResult = {
      name: (this.selectedResult.name + ` (${this.quantity})`),
      calories: Math.round(((this.selectedResult.calories/100)*this.grams)*this.quantity),
      fat: Math.round(((this.selectedResult.fat/100)*this.grams)*this.quantity),
      carbs: Math.round(((this.selectedResult.carbs/100)*this.grams)*this.quantity),
      protein: Math.round(((this.selectedResult.protein/100)*this.grams)*this.quantity),
      time: null,
      id: null,
    }

    this.trackingService.addFoodLog(this.addedResult);
  }

}

// Calories: <p> {{ ((selectedResult.calories/100)*grams)*quantity | number:'1.0-0'}}</p>
// Fat: <p> {{ ((selectedResult.fat/100)*grams)*quantity | number:'1.0-0'}}g</p>
// Carbs: <p> {{ ((selectedResult.carbs/100)*grams)*quantity | number:'1.0-0'}}g</p>
// Protein: <p> {{ ((selectedResult.protein/100)*grams)*quantity | number:'1.0-0'}}g</p>