import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from './Shared/Restaurant.model';
import { RestaurantService } from './restaurant-list/restaurant.service';
import { map, tap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private restaurantService: RestaurantService,
        private firebaseDatabase: AngularFireDatabase
    ) {}

    storeRestaurants() {
        const restaurants = this.restaurantService.getRestaurants();
        this.http
            .put(
                'https://restaurantrater-4c864-default-rtdb.firebaseio.com/restaurants.json',
                restaurants
            )
            .subscribe((response) => {
                console.log(response);
            });
    }
    fetchRestaurants() {
        this.http
            .get<Restaurant[]>(
                'https://restaurantrater-4c864-default-rtdb.firebaseio.com/restaurants.json')
            .pipe(
                map((restaurants) => {
                    if (restaurants === null) {
                        return [];
                    }
                    return restaurants.map((restaurant) => ({
                            ...restaurant,
                        }));
                }),
                tap((restaurants) => {
                    this.restaurantService.setRestaurants(restaurants);
                })
            )
            .subscribe();
    }
    updateRestaurants(restaurant: Restaurant, index: number) {
        const restaurantRef = this.firebaseDatabase.object(`restaurants/${index}`);
        restaurantRef.update({
            name: restaurant.name,
            location: restaurant.location,
            description: restaurant.description,
            rating: restaurant.rating
        })
        .then(() => {
            console.log('Restaurant Updated Successfully!');
        })
        .catch((error) => {
            console.error('Error updating restaurant:', error)
        })
        this.storeRestaurants();
    }

    deleteRestaurant(index: number) {
        const restaurantRef = this.firebaseDatabase.object(`restaurants/${index}`);
        restaurantRef
            .remove()
            .then(() => {
                console.log('Restaurant Deleted from Firebase');
            })
            .catch((error) => {
                console.log('Error deleting restaurant from Firebase:', error);
            })
            this.storeRestaurants();
    }
}