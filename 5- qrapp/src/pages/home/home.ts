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
      this._historialService.agregar_historial('http://www.google.co.ve/');
      return;
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
