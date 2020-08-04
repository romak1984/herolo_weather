import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-detailed-city-forecast',
  templateUrl: './detailed-city-forecast.component.html',
  styleUrls: ['./detailed-city-forecast.component.scss']
})
export class DetailedCityForecastComponent implements OnInit {

  @Input('currentWeatherObs') currentWeather$: Observable<any>;
  @Input('fiveDaysForecastObs') fiveDaysForecast$: Observable<any>;
  @Input('favoritesObs') favoritesObs$: Observable<any>;
  @Input() location: any;

  @Output() remove: EventEmitter<string> = new EventEmitter<string>();
  @Output() add: EventEmitter<string> = new EventEmitter<string>();

  isCurrentLocationFavorite$: Observable<boolean>;

  constructor() { }

  ngOnInit() {
    this.isCurrentLocationFavorite$ = this.favoritesObs$.pipe(
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
