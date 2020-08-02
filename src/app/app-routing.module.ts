import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{ path: 'weatherDetails', loadChildren: () => import('./weather-details/weather-details.module').then(m => m.WeatherDetailsModule) }, { path: 'favorites', loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
