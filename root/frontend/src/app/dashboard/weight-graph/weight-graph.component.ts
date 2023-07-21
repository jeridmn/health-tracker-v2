import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js/auto';
import { FoodDataService } from 'src/app/service/food-data.service';

@Component({
  selector: 'app-weight-graph',
  templateUrl: './weight-graph.component.html',
  styleUrls: ['./weight-graph.component.css']
})
export class WeightGraphComponent implements OnInit{
  public myChart: Chart
  currentDate = new Date()
  weekAgo = new Date(this.currentDate)
  dateRange: Date[] = []

  constructor(private foodDataService: FoodDataService) {

  }

  ngOnInit(): void {
    this.weekAgo.setDate(this.currentDate.getDate() - 7)

    this.dateRange = [this.weekAgo, this.currentDate]
    
    this.createChart()
    
    
  }

  onDateChange(dateRange: Date[]) {
    const selectedDateRange = dateRange
    if (!dateRange.includes(null)) {

      this.myChart.data.labels = this.foodDataService.getDateRange(selectedDateRange)
      this.myChart.data.datasets = [{
        label: 'Calories',
        data: this.foodDataService.dailyCalories,
        backgroundColor: [
            'rgba(92, 255, 180, 1)',
        ],
        borderRadius: 10

    }]
      console.log(this.foodDataService.dailyCalories)
      this.myChart.update()
    }
  }

  createChart() {
    this.myChart = new Chart("myChart", {
      type: 'bar',
      data: {
          labels: this.foodDataService.getDateRange(this.dateRange),
          datasets: [{
              label: 'Calories',
              data: this.foodDataService.dailyCalories,
              backgroundColor: [
                'rgba(92, 255, 180, 1)',
               ],
               borderRadius: 10
          }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              color: 'rgb(30, 52, 94)' // Set the color of the x-axis grid lines
            }
          },
          y: {
            grid: {
              color: 'rgb(30, 52, 94)' // Set the color of the y-axis grid lines
            }
          }
        }
      }
  });
  }

  destroyChart() {

  }

  onIncrementWeek() {
  }

  onDecrementWeek() {

  }


}
