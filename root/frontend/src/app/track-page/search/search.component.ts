import { Component, OnInit } from '@angular/core';
import { FoodDbSearchService } from 'src/app/service/food-db-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  constructor(private foodSearchService: FoodDbSearchService) {

  }

  ngOnInit(): void {
    this.foodSearchService.getSearchResults('goldfish')
  }

}
