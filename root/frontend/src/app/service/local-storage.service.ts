import { Injectable } from "@angular/core";
import { FoodLog } from "../models/FoodLog";

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
    
    setData(storageName: string, data:any[]) {
        localStorage.setItem(storageName, JSON.stringify(data))
    }

    getData(storageName: string): any[] {
        return JSON.parse(localStorage.getItem(storageName))
    }
}
