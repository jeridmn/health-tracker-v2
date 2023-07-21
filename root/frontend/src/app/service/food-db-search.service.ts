import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FoodLog } from '../models/FoodLog';
import { FoodResult } from '../models/FoodResult';

@Injectable({
  providedIn: 'root'
})
export class FoodDbSearchService {
  API_KEY = 'p8Ipi0fCcazy2ZwYJI34b7OK7FmNnmt6ginFNiQW'
  searchResults: FoodResult[] = [] 

  constructor(private http: HttpClient) { }

  getSearchResults(searchString: string) {
    this.http.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${this.API_KEY}&query=${searchString}`).subscribe(
      (response:any) => {
        this.searchResults = []
        let results = response.foods
        console.log(response)
        results.forEach( food => {
          
          this.searchResults.push(
            new FoodResult(
              food.description,
              food.foodNutrients.find(nutrients => nutrients.nutrientId === 1008)?.value,
              food.foodNutrients.find(nutrients => nutrients.nutrientId === 1005)?.value,
              food.foodNutrients.find(nutrients => nutrients.nutrientId === 1004)?.value,
              food.foodNutrients.find(nutrients => nutrients.nutrientId === 1003)?.value
            )
          )
        }
        )
        console.log(this.searchResults)
      },
      (error) => {

      }
    )
  }
}
