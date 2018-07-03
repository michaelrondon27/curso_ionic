import { Injectable } from '@angular/core';

import { ScanData } from '../../models/scan-data.model';

import { InAppBrowser } from '@ionic-native/in-app-browser';

@Injectable()
export class HistorialProvider {

  private _historial: ScanData [] = [];

  constructor(
    private iab: InAppBrowser
  ) { }

  agregar_historial( texto: string ) {

    let data = new ScanData( texto );

    this._historial.unshift( data );

    this.abrir_scan( 0 );

  }

  abrir_scan( index: number ) {

    let  scanData = this._historial[index];

    switch ( scanData.tipo ) {

      case 'http':
        this.iab.create(scanData.info, '_system');
      break;

      case 'contacto':
        this.crear_contacto( scanData.info );
      break;

      default:
        console.error('Tipo no soportado');

    }

  }

  private crear_contacto( texto: string ) {

    let campos: any = this.parse_vcard( texto );

    console.log( campos );

  }

  private parse_vcard( input: string ) {

      var Re1 = /^(version|fn|title|org):(.+)$/i;
      var Re2 = /^([^:;]+);([^:]+):(.+)$/;
      var ReKey = /item\d{1,2}\./;
      var fields = {};

      input.split(/\r\n|\r|\n/).forEach(function (line) {
          var results, key;

          if (Re1.test(line)) {

              results = line.match(Re1);
              key = results[1].toLowerCase();
              fields[key] = results[2];

          } else if (Re2.test(line)) {

              results = line.match(Re2);
              key = results[1].replace(ReKey, '').toLowerCase();

              var meta = {};
              results[2].split(';')
                  .map(function (p, i) {
                  var match = p.match(/([a-z]+)=(.*)/i);
                  if (match) {
                      return [match[1], match[2]];
                  } else {
                      return ["TYPE" + (i === 0 ? "" : i), p];
                  }
              })
                  .forEach(function (p) {
                  meta[p[0]] = p[1];
              });

              if (!fields[key]) fields[key] = [];

              fields[key].push({
                  meta: meta,
                  value: results[3].split(';')
              })
          }
      });

      return fields;
  };

  cargar_historial() {

    return this._historial;

  }

}
