import { locations } from './../weather-details/currentWeatherMock';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  apiKey = 'PrYdYR0XAGaPO3cj88PVwuP5mJPApHGc';
  baseUrl = 'https://dataservice.accuweather.com';

  private favoriteLocations: any[] = this.getFavoritesFromLocalStorage();
  private favoriteLocations$: BehaviorSubject<any> = new BehaviorSubject<any>(this.favoriteLocations);
  private currentLocation = this.getCurrentLocationFromLocalStorage();
  private currentLocation$: BehaviorSubject<any> = new BehaviorSubject<any>(this.currentLocation);

  getLocationsByAutoComplete(searhcString: string): Observable<any> {
    const locationsUrl = '/locations/v1/cities/autocomplete';
    const params = new HttpParams()
    .set('apikey', this.apiKey)
    .set('language', 'EN-US')
    .set('details', 'false')
    .set('q', searhcString);

    return this.http.get<any>(this.baseUrl + locationsUrl, {params}).pipe(
      catchError(err => { alert('error occured: ' + JSON.stringify(err.error)); return of(null); })
      );
  }

  getCurrentWeather(locationKey: any): Observable<any> {
    const currentWeatherForecastUrl = '/currentconditions/v1/';
    const params = new HttpParams()
    .set('apikey', this.apiKey)
    .set('language', 'EN-US')
    .set('details', 'false');

    return this.http.get<any>(this.baseUrl + currentWeatherForecastUrl + locationKey, {params}).pipe(
      catchError(err => { alert('error occured: ' + JSON.stringify(err.error)); return of(null); })
      );
  }

  getFiveDaysForecast(locationKey: any): Observable<any> {
    const fiveDaysForecastUrl = '/forecasts/v1/daily/5day/';
    const params = new HttpParams()
    .set('apikey', this.apiKey)
    .set('language', 'EN-US')
    .set('metric', 'true')
    .set('details', 'false');

    return this.http.get<any>(this.baseUrl + fiveDaysForecastUrl + locationKey, {params}).pipe(
      catchError(err => { alert('error occured: ' + JSON.stringify(err.error)); return of(null); })
      );
  }

  addToFavorites(location: any){
    this.favoriteLocations = this.getFavoritesFromLocalStorage();
    this.favoriteLocations.push(location);
    localStorage.setItem('favorites', JSON.stringify(this.favoriteLocations));
    this.favoriteLocations$.next(this.favoriteLocations);
  }

  removeFromFavorites(location: any) {
    this.favoriteLocations = this.getFavoritesFromLocalStorage();
    const index = this.favoriteLocations.indexOf((savedLocation) => savedLocation.LocalizedName === location.LocalizedName);
    this.favoriteLocations.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(this.favoriteLocations));
    this.favoriteLocations$.next(this.favoriteLocations);
  }

  getCurrenLocation() {
    return this.currentLocation$.asObservable();
  }

  setCurrentLocation(location: any){
    localStorage.setItem('currentLocation', JSON.stringify(location));
    this.currentLocation$.next(location);
  }

  getFavorites(): Observable<any>{
    return this.favoriteLocations$.asObservable();
  }

  private getFavoritesFromLocalStorage(): any[]{
    return JSON.parse(localStorage.getItem('favorites')) || [];
  }

  private getCurrentLocationFromLocalStorage(): any {
    return JSON.parse(localStorage.getItem('currentLocation')) || null;
  }
}
