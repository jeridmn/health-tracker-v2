import { EventEmitter, Injectable, Output } from "@angular/core";
import { FoodLog } from "../models/FoodLog";
import { LocalStorageService } from "./local-storage.service";
import { TrackingService } from "./tracking.service";

@Injectable({
  providedIn: 'root',
})
export class FoodDataService {
    dailyCalories = []
    dates = []

    constructor(private trackingService: TrackingService,
        private localStorageService: LocalStorageService) {

    }
    
    getDailyCalories(date: Date) {
        var totalDailyCal = 0;
        
        const dailyLogs = this.localStorageService.getData('foodLogs').filter(log => (
            new Date(log.time).getDate() == date.getDate() &&
            new Date(log.time).getMonth() == date.getMonth() &&
            new Date(log.time).getFullYear() == date.getFullYear()
        ))
        
        dailyLogs.forEach(log => {
            totalDailyCal += log.calories
        })

        return totalDailyCal
    }

    getDateRange(dateRange: Date[]) {
        this.dates = []
        this.dailyCalories = []
        console.log('????')
        var currDate = new Date(dateRange[0]);
        var startDate = dateRange[0].getDate()
        var endDate = dateRange[1].getDate()
        
        for (var i = startDate; i <= endDate; i++) {
            this.dates.push(new Date(currDate).toDateString())
            this.dailyCalories.push(this.getDailyCalories(new Date(currDate)))

            currDate.setDate(currDate.getDate() + 1)
        }



        return this.dates
    }


}
