//import { HttpClient } from '@angular/common/http';
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

  public sqliteConfig: {
    name: 'data.db',
    location: 'default'
  };

  constructor(private sqlite: SQLite) {
    console.log('Hello SqliteDataProvider Provider');
  }

  createSqlTable() {
    console.log('Creating sqlite instance and table.');
    return this.sqlite.create({name: 'data.db',location: 'default'})
      .then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS SensorDataTable' +
                    '(timestamp VARCHAR(255) PRIMARY KEY,' +
                    'gpsHoriz NUMERIC,' +
                    'gpsHorizAcc NUMERIC,' +
                    'gpsVert NUMERIC,' +
                    'gpsVertAcc NUMERIC,' +
                    'accelX NUMERIC,' +
                    'accelY NUMERIC,' +
                    'accelZ NUMERIC,' +
                    'magHead NUMERIC,' +
                    'trueHead NUMERIC,' +
                    'headAcc NUMERIC' +
                    ');', {})
          .then(() => console.log('Executed SQL Create Table.'))
          .catch(e => console.log(JSON.stringify(e)));
        db.executeSql('SELECT * FROM SensorDataTable;', {})
          .then(res => console.log(JSON.stringify(res)))
          .catch(e => console.log(JSON.stringify(e)));
      }).catch(e => {
        console.log('Error creating SQLite object.');
        console.log(JSON.stringify(JSON.stringify(e)));
      });
  }

  insertSqlData(timestamp, gpsHoriz, gpsHorizAcc, gpsVert, gpsVertAcc, accelX,
    accelY, accelZ, magHead, trueHead, headAcc) {
    return this.sqlite.create(sqliteConfig)
      .then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO SensorDataTable VALUE (?,?,?,?,?,?,?,?,?,?,?)', 
          [timestamp, gpsHoriz, gpsHorizAcc, gpsVert, gpsVertAcc, accelX,
          accelY, accelZ, magHead, trueHead, headAcc])
          .then(() => console.log('Inserted data to SQL'))
          .catch(e => console.log(e));
      }).catch(e => console.log(e));
  }

}
