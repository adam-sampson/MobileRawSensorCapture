import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { EmailComposer } from '@ionic-native/email-composer';

/*
  Generated class for the SqliteDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SqliteDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SqliteDataProvider Provider');
  }

}
