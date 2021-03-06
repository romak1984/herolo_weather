import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherDetailsRoutingModule } from './weather-details-routing.module';
import { WeatherDetailsComponent } from './weather-details.component';
import { DetailedCityForecastComponent } from './detailed-city-forecast/detailed-city-forecast.component';
import { WeatherCardComponent } from './detailed-city-forecast/weather-card/weather-card.component';
import { CitySearchComponent } from './city-search/city-search.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [WeatherDetailsComponent, DetailedCityForecastComponent, WeatherCardComponent, CitySearchComponent],
  imports: [
    CommonModule,
    WeatherDetailsRoutingModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    AngularFontAwesomeModule
  ]
})
export class WeatherDetailsModule { }
