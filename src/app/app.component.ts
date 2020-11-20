import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  apiLoaded: Observable<boolean>;
  name = "LAL";

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBVst5D1IiluQ1IlYfbo2xbAI4ogKRPx6A', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }

  change(){
    this.name = "Srilal";
  }

  center: google.maps.LatLngLiteral = {lat: 6.9271, lng: 79.8612};
  zoom = 12;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [{lat: 6.9118331, lng: 79.8513357}];

  addMarker(event: google.maps.MouseEvent) {
   // this.markerPositions.push(event.latLng.toJSON());
    console.log(event.latLng.toJSON());
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
    //console.log(this.route)
  }
}
