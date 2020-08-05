import { WeatherService } from './../../api/weather.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, tap, switchMap, filter } from 'rxjs/operators';


@Component({
  selector: 'app-detailed-city-forecast',
  templateUrl: './detailed-city-forecast.component.html',
  styleUrls: ['./detailed-city-forecast.component.scss']
})
export class DetailedCityForecastComponent implements OnInit {


  @Output() remove: EventEmitter<string> = new EventEmitter<string>();
  @Output() add: EventEmitter<string> = new EventEmitter<string>();

  currentWeather$: Observable<any>;
  fiveDaysForecast$: Observable<any>;
  favorites$: Observable<any>;
  currentLocation$: Observable<any>;
  isCurrentLocationFavorite$: Observable<boolean>;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.currentLocation$ = this.weatherService.getCurrenLocation();
    this.currentWeather$ = this.currentLocation$.pipe(
      filter((currentLocation: any) => currentLocation !== null),
      tap(value => console.log('loc: ', value)),
      switchMap((location: any) => this.weatherService.getCurrentWeather(location.Key))
      );
    this.fiveDaysForecast$ = this.currentLocation$.pipe(
      filter((currentLocation: any) => currentLocation !== null),
      switchMap((location: any) => this.weatherService.getFiveDaysForecast(location.Key))
      );
    this.favorites$ = this.weatherService.getFavorites();

    this.isCurrentLocationFavorite$ = combineLatest(this.currentLocation$, this.favorites$).pipe(
      filter(([location, favoriteLocs]: any) => (location !== null && favoriteLocs !== null && favoriteLocs !== [])),
      map(([location, favoriteLocs]: any) => favoriteLocs.findIndex((favoriteLoc: any) => favoriteLoc.Key === location.Key) !== -1)
    );
  }

  addToFavorites(currentLocation: any){
    this.add.emit(currentLocation);
  }

  removeFromFavorites(currentLocation: any){
    this.remove.emit(currentLocation);
  }
}
