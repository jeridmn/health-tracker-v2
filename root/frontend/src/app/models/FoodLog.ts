export class FoodLog {
    public name: string;
    public calories: number;
    public fat: number;
    public carbs: number;
    public protein: number;
    public time: Date;
    public id: string;

    constructor(name: string, cal: number, fat: number, carbs: number, protein: number, time: Date, id: string) {
        this.name = name;
        this.calories = cal;
        this.carbs = carbs;
        this.fat = fat;
        this.protein = protein;
        this.time = time;
        this.id = id;
    }
}