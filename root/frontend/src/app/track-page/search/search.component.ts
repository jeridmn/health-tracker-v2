import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FoodResult } from 'src/app/models/FoodResult';
import { FoodDbSearchService } from 'src/app/service/food-db-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchQuery = new FormControl('')
  visible = false
  selectedResult: FoodResult

  constructor(public foodSearchService: FoodDbSearchService) {

  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.foodSearchService.getSearchResults(this.searchQuery.value)
  }

  toggleEditFood(food: FoodResult) {
    this.selectedResult = food;
    this.visible = !this.visible
  }

}
