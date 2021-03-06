import { Component } from '@angular/core';

// Plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

// Components
import { ToastController, Platform } from 'ionic-angular';

// Providers
import { HistorialProvider } from '../../providers/historial/historial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController,
    private platform: Platform,
    private _historialService: HistorialProvider
  ) { }

  scan() {

    if ( !this.platform.is('cordova') ) {
      // this._historialService.agregar_historial('http://www.google.co.ve/');
      // this._historialService.agregar_historial( `BEGIN:VCARD
      // VERSION:2.1
      // N:Kent;Clark
      // FN:Clark Kent
      // ORG:
      // TEL;HOME;VOICE:12345
      // TEL;TYPE=cell:67890
      // ADR;TYPE=work:;;;
      // EMAIL:clark@superman.com
      // END:VCARD` );
      // return;
      this._historialService.agregar_historial( 'MATMSG:TO:mrondon72@gmail.com;SUB:prueba ionic;BODY:saludos my nigga;;');
    }

    this.barcodeScanner.scan().then( barcodeData => {

      console.log("Result: ", barcodeData.text );
      console.log("Format: ", barcodeData.format );
      console.log("Cancelled: ", barcodeData.cancelled );

      if ( barcodeData.cancelled === false && barcodeData.text != null ) {
        this._historialService.agregar_historial( barcodeData.text );
      }

    }).catch( err => {

        this.mostrar_error("Error: " + err);

    });

  }

  mostrar_error( mensaje: string ) {

    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2500
    });
    toast.present();

  }

}
