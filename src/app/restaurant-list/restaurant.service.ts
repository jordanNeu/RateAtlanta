import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Restaurant } from "../Shared/Restaurant.model";


@Injectable()
export class RestaurantService {
    restaurantChanged = new Subject<Restaurant[]>();
    restaurantSelected = new Subject<Restaurant>();

    restaurants: Restaurant[] = [];

    constructor() {}

    setRestaurants(restautants: Restaurant[]) {
        this.restaurants = restautants;
        this.restaurantChanged.next(this.restaurants.slice());
    }

    getRestaurants() {
        return this.restaurants.slice();
    }

    getRestaurant(index: number) {
        return this.restaurants[index];
    }
    
    addRestaurant(rest: Restaurant) {
        this.restaurants.push(rest);
        this.restaurantChanged.next(this.restaurants.slice());
    }

    updateRestaurant(index: number, newRest: Restaurant) {
        this.restaurants[index] = newRest;
        this.restaurantChanged.next(this.restaurants.slice());
    }
    
    deleteRestaurant(index: number) {
        this.restaurants.splice(index, 1);
        this.restaurantChanged.next(this.restaurants.slice());
    }
}