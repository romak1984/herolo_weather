import { Observable } from 'rxjs';
import { WeatherService } from './../api/weather.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(private weatherService: WeatherService, private router: Router) { }

  favoritesLoc$: Observable<any[]>;
  ngOnInit() {
    this.favoritesLoc$ = this.weatherService.getFavorites();
  }

  favoriteSelected(location: any){
    this.weatherService.setCurrentLocation(location);
    this.router.navigateByUrl('/weatherDetails');
  }
}
