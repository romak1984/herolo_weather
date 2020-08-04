import { WeatherService } from './../api/weather.service';
import { Component, OnInit } from '@angular/core';

//import { localizedWeather, fiveDaysForecast } from './currentWeatherMock';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit {

  currentLocation$: Observable<any>;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.currentLocation$ = this.weatherService.getCurrenLocation();

    // this.selectedLocation = {
    //   "Version": 1,
    //   "Key": "328328",
    //   "Type": "City",
    //   "Rank": 10,
    //   "LocalizedName": "London",
    //   "Country": {
    //     "ID": "GB",
    //     "LocalizedName": "United Kingdom"
    //   },
    //   "AdministrativeArea": {
    //     "ID": "LND",
    //     "LocalizedName": "London"
    //   }
    // };
  }

  locationSelected(location: any) {
    this.weatherService.setCurrentLocation(location);
  }

  addToFavorites(location: any){
    this.weatherService.addToFavorites(location);
  }

  removeFromFavorites(location: any){
    this.weatherService.removeFromFavorites(location);
  }
}
