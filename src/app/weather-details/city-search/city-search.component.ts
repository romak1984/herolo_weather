import { WeatherService } from './../../api/weather.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit {

  searchControl = new FormControl('');
  options = ['a', 'b', 'c'];
  filteredOptions: Observable<any[]>;
  search: EventEmitter<any> = new EventEmitter<any>();

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((search: string) => {
          return this.weatherService.getLocationsByAutoComplete(search);
        }));
  }

  onSearch(loaction: any){
    this.search.emit(location);
  }
}
