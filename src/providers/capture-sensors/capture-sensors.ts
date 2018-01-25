//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { Platform } from 'ionic-angular';
//import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import { SqliteDataProvider } from '../providers/sqlite-data/sqlite-data';
import { SqliteDataProvider } from '../sqlite-data/sqlite-data'

/*
  Generated class for the CaptureSensorsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CaptureSensorsProvider {

  public gpsConfig: {
    maximumAge: 0,
    timeout: 5000,
    enableHighAccuracy: true
  };

  public gps: any;
  public accel: any;
  public head: any;

  // constructor(public gps: Geolocation, public accel: DeviceMotion, 
  //             public compass: DeviceOrientation) {
  constructor(private platform: Platform, public geo: Geolocation,
              public accelerometer: DeviceMotion, public compass: DeviceOrientation,
              public sqlprov: SqliteDataProvider) {
    console.log('CaptureSensorsProvider Loaded');
  }

  // Allow user to check to see that all sensors are working by getting one reading
  // Test code seems to be working.
  testSensors() { 
    
    this.platform.ready().then( () => {

      // Get GPS
      this.geo.getCurrentPosition(this.gpsConfig).then( pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude + 
        ', alt: ' + pos.coords.altitude);
        // this.lat = pos.coords.latitude;
        // this.lon = pos.coords.longitude;
        // this.alt = pos.coords.altitude;
        // this.z_acc = pos.coords.altitudeAccuracy;
        // this.xy_acc = pos.coords.accuracy;
        this.gps = pos;
        // console.log('sensorOutLat: ' + sensorOut.gps.coords.latitude);
      });

      // Get Accel
      if(this.platform.is('cordova')) {
        this.accelerometer.getCurrentAcceleration().
        then( acceleration => {
          console.log('Acceleration: ' + JSON.stringify(acceleration));
          this.accel = acceleration;
        });
      } else {
        console.log('No accelerometer except on cordova device.');
      }

      // Get Compass
      // this.compass.getCurrentHeading().then(
      //   (data: DeviceOrientationCompassHeading) => console.log(JSON.stringify(data)),
      //   (error: any) => console.log(error)
      // );
      if(this.platform.is('cordova')) {
        this.compass.getCurrentHeading().then( heading => {
          console.log('Heading: ' + JSON.stringify(heading));
          this.head = heading;
        });
      } else {
        console.log('No compass except on cordova device.');
      }

    });

    //console.log("Sensor test: " + JSON.stringify(this.gpsReading))

    //return sensorOut;
  }

  // Check sensors in order and wait for each
  getSensorOnce() {
      return this.geo.getCurrentPosition(this.gpsConfig).then( pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude + 
        ', alt: ' + pos.coords.altitude);
        return this.gps = pos;
      }).then( () => {
        if(this.platform.is('cordova')) {
          this.compass.getCurrentHeading().then( heading => {
            console.log('Heading: ' + JSON.stringify(heading));
            return this.head = heading;
          });
        }
      }).then( () => {
        if(this.platform.is('cordova')) {
          this.accelerometer.getCurrentAcceleration().
          then( acceleration => {
            console.log('Acceleration: ' + JSON.stringify(acceleration));
            return this.accel = acceleration;
          });
        }
      }).then( () => {
        this.sqlprov.createSqlTable();
      });
  }



}  