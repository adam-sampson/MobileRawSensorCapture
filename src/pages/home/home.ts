import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GeoTrackProvider } from '../../providers/geo-track/geo-track';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public gps_pos: any;

  constructor(public navCtrl: NavController, public geo: GeoTrackProvider) {

  }

  gpsOnce () {
    this.geo.getGpsOnce();
  }

  startGpsWatch () {
    this.geo.watchGps();
  }

  stopGpsWatch () {
    this.geo.unwatchGps();
  }

  startGpsInterval () {
    this.geo.gpsEach(1000);
  }

  stopGpsInterval () {
    console.log('Stop polling GPS.');
    window.clearInterval(this.geo.gpsInterval)
  }
}
