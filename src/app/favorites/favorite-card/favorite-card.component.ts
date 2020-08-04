import { Observable } from 'rxjs';
import { WeatherService } from './../../api/weather.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent implements OnInit {

  @Input() favoriteLoc: any;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  currentWeather$: Observable<any>;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.currentWeather$ = this.weatherService.getCurrentWeather(this.favoriteLoc.Key);
  }

  selectFavorite(){
    this.selected.emit(this.favoriteLoc);
  }

}
