import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path: '', redirectTo: '/ratings', pathMatch: 'full'},
  {path: 'ratings', component: RestaurantListComponent, children: [
  ]},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
