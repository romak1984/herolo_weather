import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherDetailsRoutingModule } from './weather-details-routing.module';
import { WeatherDetailsComponent } from './weather-details.component';
import { DetailedCityForecastComponent } from './detailed-city-forecast/detailed-city-forecast.component';
import { WeatherCardComponent } from './detailed-city-forecast/weather-card/weather-card.component';
import { CitySearchComponent } from './city-search/city-search.component';


@NgModule({
  declarations: [WeatherDetailsComponent, DetailedCityForecastComponent, WeatherCardComponent, CitySearchComponent],
  imports: [
    CommonModule,
    WeatherDetailsRoutingModule
  ]
})
export class WeatherDetailsModule { }
