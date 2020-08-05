import { WeatherService } from './../../api/weather.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter, tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit, OnDestroy {

  searchControl: FormControl = new FormControl('');
  subsciption$: Subscription;
  filteredOptions: Observable<any[]>;
  currentLocation$: Observable<any>;
  @Output() search: EventEmitter<any> = new EventEmitter<any>();

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.subsciption$ = this.weatherService.getCurrenLocation().pipe(
      take(1)).subscribe(value => this.searchControl.setValue(value)
      );
    this.filteredOptions = this.searchControl.valueChanges
      .pipe(
        filter(value => value !== ''),
        debounceTime(400),
        filter(value => typeof value === 'string'),
        distinctUntilChanged(),
        switchMap((search: string) => {
          return this.weatherService.getLocationsByAutoComplete(search);
        }));
  }

  ngOnDestroy(): void {
    this.subsciption$.unsubscribe();

  }

  displayFn(location: any): string {
    return location && location.LocalizedName ? location.LocalizedName : '';
  }

  onSearch(location: any){
    if(typeof location !== 'string'){
      this.search.emit(location);
    }
  }
}
