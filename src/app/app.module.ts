import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
//import { GeoTrackProvider } from '../providers/geo-track/geo-track';
import { CaptureSensorsProvider } from '../providers/capture-sensors/capture-sensors';
import { SqliteDataProvider } from '../providers/sqlite-data/sqlite-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    DeviceMotion,
    DeviceOrientation,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //GeoTrackProvider,
    CaptureSensorsProvider,
    SqliteDataProvider
  ]
})
export class AppModule {}
