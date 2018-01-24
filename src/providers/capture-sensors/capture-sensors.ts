//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
//import { Platform } from 'ionic-angular';

/*
  Generated class for the CaptureSensorsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CaptureSensorsProvider {

  constructor(public gps: Geolocation, public accel: DeviceMotion, 
              public compass: DeviceOrientation) {
    console.log('CaptureSensorsProvider Loaded');
  }

  // Allow user to check to see that all sensors are working by getting one reading
  testSensors() { 
    let sensorOut = [
      {
        gps: any;
        accel: any;
        compass: any;
      }
    ];

    
    
    return sensorOut;
  }

}
