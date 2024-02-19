import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Subscription } from 'rxjs';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from '../Shared/Restaurant.model';
import { DataStorageService } from '../dataStorage.service';


@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css'],
})

export class RestaurantListComponent implements OnInit {
  constructor(
    private restaurantService: RestaurantService,
    private formBuilder: FormBuilder,
    private db: AngularFireDatabase,
    private dataStorage: DataStorageService
  ) {}

  restaurantSearch!: FormGroup;
  restaurantData: any;
  restaurantHistory: any;
  id: number;
  sortOption = 'score';

  ngOnInit() {
    this.restaurantSearch = this.formBuilder.group({
      name: [''],
      location: [''],
      description: [''],
      rating: []
    });
    this.dataStorage.fetchRestaurants();

    this.db
      .list('restaurantHistory')
      .valueChanges()
      .subscribe((data: any) => {
        this.restaurantHistory = data;
      });
  }

  onSubmit() {
    console.log("Adding Restaurant....");
    this.restaurantService.addRestaurant(this.restaurantSearch.value);
    console.log("Restaurant Added!");
    this.dataStorage.storeRestaurants();
    this.restaurantSearch.reset();
  }

  onPutRestaurant() {
    this.dataStorage.storeRestaurants;
    console.log("Restaurant Stored!");
  }

  getStoredRestaurants() {
    return this.restaurantService.getRestaurants();
  }
  
  onEditRestaurant(index: number) {
    const restaurant = this.restaurantService.getRestaurant(index);
    if (restaurant) {
      restaurant.editing = true;
    }
  }
  
  onSaveRestaurant(restaurant: Restaurant) {
    this.restaurantService.updateRestaurant(this.id, restaurant);
    restaurant.editing = false;
  }

  onCancelEditRestaurant(restaurant: Restaurant) {
    restaurant.editing = false;
  }

  onDeleteRestaurant(index: number) {
    this.restaurantService.deleteRestaurant(index);
    this.dataStorage.deleteRestaurant(index)

  }

  private initForm() {
    let restaurantName = '';
    let restaurantLocation = '';
    let restaurantDescription = '';
    let restaurantRating;

    const restaurant = this.restaurantService.getRestaurant(this.id);
    restaurantName = restaurant.name;
    restaurantLocation = restaurant.location;
    restaurantDescription = restaurant.description;
    restaurantRating = restaurant.rating;

    this.restaurantSearch = new FormGroup({
      name: new FormControl(restaurantName),
      location: new FormControl(restaurantLocation),
      description: new FormControl(restaurantDescription),
      rating: new FormControl(restaurantRating),
    });
  }
}
