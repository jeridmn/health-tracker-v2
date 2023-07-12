export class FoodResult {
    public name: string;
    public calories: number;
    public fat: number;
    public carbs: number;
    public protein: number;

    constructor(name: string, cal: number, fat: number, carbs: number, protein: number) {
        this.name = name;
        this.calories = cal;
        this.carbs = carbs;
        this.fat = fat;
        this.protein = protein;
    }
}