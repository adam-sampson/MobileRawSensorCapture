//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';

/*
  Generated class for the GeoTrackProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeoTrackProvider {

  public watch: any;
  public lat: number = 0;
  public lon: number = 0;
  public alt: number = 0;
  public z_acc: number = 0;
  public xy_acc: number = 0;

  public gpsInterval: any;

  public gpsConfig: {
    maximumAge: 0,
    timeout: 5000,
    enableHighAccuracy: true
  };

  constructor(private platform: Platform, public geolocation: Geolocation) {
    console.log('Hello GeoTrackProvider Provider');
  }

  getGpsOnce() {
    this.platform.ready().then( () => {
      this.geolocation.getCurrentPosition(this.gpsConfig).then( pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude + 
        ', alt: ' + pos.coords.altitude);
        this.lat = pos.coords.latitude;
        this.lon = pos.coords.longitude;
        this.alt = pos.coords.altitude;
        this.z_acc = pos.coords.altitudeAccuracy;
        this.xy_acc = pos.coords.accuracy;
      });
    });
  }

  watchGps () {
    this.platform.ready().then( () => {
      this.watch = this.geolocation.watchPosition(this.gpsConfig).subscribe( pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        this.lat = pos.coords.latitude;
        this.lon = pos.coords.longitude;
        this.alt = pos.coords.altitude;
        this.z_acc = pos.coords.altitudeAccuracy;
        this.xy_acc = pos.coords.accuracy;
      });
    });
  }

  unwatchGps () {
    this.watch.unsubscribe();
  }

  gpsEach (setTime) {
    console.log('Start polling GPS every: ' + setTime);
    //this.gpsInterval = setInterval(this.getGpsOnce(),setTime);
    this.gpsInterval = setInterval(() => this.getGpsOnce(), setTime);
  }

}
