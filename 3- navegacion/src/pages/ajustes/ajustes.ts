import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ModalPage } from '../index.paginas';

@Component({
  selector: 'page-ajustes',
  templateUrl: 'ajustes.html',
})
export class AjustesPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController
  ) {
  }

  activarPrincipal() {

    this.navCtrl.parent.select(2);

  }

  mostrar_modal() {

    let modal = this.modalCtrl.create( ModalPage, { nombre: "Michael", edad: 25 } );

    modal.present();

    modal.onDidDismiss( parametros => {

      if( parametros ) {
        console.log( parametros );
      }

    });

  }

}
