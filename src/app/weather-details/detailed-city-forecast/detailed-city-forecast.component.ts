import { WeatherService } from './../../api/weather.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-detailed-city-forecast',
  templateUrl: './detailed-city-forecast.component.html',
  styleUrls: ['./detailed-city-forecast.component.scss']
})
export class DetailedCityForecastComponent implements OnInit {


  @Input() location: any;
  @Output() remove: EventEmitter<string> = new EventEmitter<string>();
  @Output() add: EventEmitter<string> = new EventEmitter<string>();

  currentWeather$: Observable<any>;
  fiveDaysForecast$: Observable<any>;
  favorites$: Observable<any>;
  isCurrentLocationFavorite$: Observable<boolean>;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.currentWeather$ = this.weatherService.getCurrentWeather(this.location.Key);
    this.fiveDaysForecast$ = this.weatherService.getFiveDaysForecast(this.location.Key);
    this.favorites$ = this.weatherService.getFavorites();
    this.isCurrentLocationFavorite$ = this.favorites$.pipe(
      tap(value => console.log(value)),
      map((locations: any[]) => locations.findIndex((location: any) => location.Key === this.location.Key) !== -1)
      );
  }

  addToFavorites(){
    this.add.emit(this.location);
  }

  removeFromFavorites(){
    this.remove.emit(this.location);
  }
}
