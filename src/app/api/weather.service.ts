import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  apiKey = "PrYdYR0XAGaPO3cj88PVwuP5mJPApHGc";
  baseUrl = "http://dataservice.accuweather.com"
  locationAutoCompletePath = "autocomplete"

  getLocationsByAutoComplete(searhcString: string): Observable<any> {
    const locationsUrl = "/locations/v1/cities/"
    const params = new HttpParams()
    .set('apiKey', this.apiKey)
    .set('language', 'EN-US')
    .set('details', 'false')
    .set('q', searhcString);

    return this.http.get<any>(this.baseUrl + locationsUrl, {params});
  }

  getCurrentWeather(locationKey: any): Observable<any> {
    const currentWeatherForecastUrl = "/currentconditions/v1/"
    const params = new HttpParams()
    .set('apiKey', this.apiKey)
    .set('language', 'EN-US')
    .set('details', 'false');

    return this.http.get<any>(this.baseUrl + currentWeatherForecastUrl + locationKey, {params});
  }

  getFiveDaysForecast(locationKey: any): Observable<any> {
    const fiveDaysForecastUrl = "/forecasts/v1/daily/5day/"
    const params = new HttpParams()
    .set('apiKey', this.apiKey)
    .set('language', 'EN-US')
    .set('details', 'false');

    return this.http.get<any>(this.baseUrl + fiveDaysForecastUrl + locationKey, {params});
  }
}
