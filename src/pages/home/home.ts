import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { GeoTrackProvider } from '../../providers/geo-track/geo-track';
import { CaptureSensorsProvider } from '../../providers/capture-sensors/capture-sensors'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public gps_pos: any;

  // constructor(public navCtrl: NavController, public geo: GeoTrackProvider,
  //             public sensor: CaptureSensorsProvider) {
  constructor(public navCtrl: NavController, public sensor: CaptureSensorsProvider) {
    
  }

  gpsOnce () {
    //this.geo.getGpsOnce();
    //this.sensor.testSensors();
    this.sensor.getSensorOnce();
  }

  startGpsWatch () {
    //this.geo.watchGps();
  }

  stopGpsWatch () {
    //this.geo.unwatchGps();
  }

  startGpsInterval () {
    //this.geo.gpsEach(1000);
  }

  stopGpsInterval () {
    console.log('Stop polling GPS.');
    //window.clearInterval(this.geo.gpsInterval)
  }

}
