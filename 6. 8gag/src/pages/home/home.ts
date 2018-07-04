import { Component } from '@angular/core';
import {
  ModalController
} from 'ionic-angular';

import { SubirPage } from '../subir/subir';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public modalCtrl: ModalController,

  ) {

  }

  mostrar_modal() {

    let modal = this.modalCtrl.create( SubirPage );

    modal.present();

  }

}
