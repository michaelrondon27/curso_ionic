import { Component } from '@angular/core';

// Plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

// Components
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController
  ) { }

  scan() {

    this.barcodeScanner.scan().then( barcodeData => {
        console.log('Barcode data', barcodeData);
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
