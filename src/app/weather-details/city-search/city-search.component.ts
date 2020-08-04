import { WeatherService } from './../../api/weather.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit {

  searchControl = new FormControl('');
  filteredOptions: Observable<any[]>;
  @Output() search: EventEmitter<any> = new EventEmitter<any>();

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges
      .pipe(
        filter(value => value !== ''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((search: string) => {
          return this.weatherService.getLocationsByAutoComplete(search);
        }));
  }

  displayFn(location: any): string {
    return location && location.LocalizedName ? location.LocalizedName : '';
  }

  onSearch(location: any){
    this.search.emit(location);
  }
}
