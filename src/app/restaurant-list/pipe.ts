import { Pipe, PipeTransform } from "@angular/core";
import { Restaurant } from "../Shared/Restaurant.model";

@Pipe({
    name: 'restaurantFilter'
})
export class RestaurantFilterPipe implements PipeTransform {
    transform(
      restaurants: Restaurant[],
      filterText: string,
      sortOption: string
    ): Restaurant[] {
      if (!restaurants || (!filterText && !sortOption)) {
        return restaurants;
      }
  
      let filteredRestaurants = restaurants;
  
      if (filterText && typeof filterText === 'string') {
        filterText = filterText.toLowerCase();
        filteredRestaurants = restaurants.filter(
          restaurant =>
            restaurant.name.toLowerCase().includes(filterText) ||
            restaurant.location.toLowerCase().includes(filterText) ||
            restaurant.description.toLowerCase().includes(filterText)
        );
      }
  
      if (sortOption) {
        if (sortOption === 'score') {
          filteredRestaurants = filteredRestaurants.sort(
            (a, b) => b.rating - a.rating
          );
        } else if (sortOption === 'name') {
          filteredRestaurants = filteredRestaurants.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
        }
      }
  
      return filteredRestaurants;
    }
  }