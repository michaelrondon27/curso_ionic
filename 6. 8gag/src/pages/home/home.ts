import { Component } from '@angular/core';
import {
  ModalController
} from 'ionic-angular';

import { SubirPage } from '../subir/subir';

import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    private modalCtrl: ModalController,
    public _cap: CargaArchivoProvider
  ) { }

  mostrar_modal() {

    let modal = this.modalCtrl.create( SubirPage );

    modal.present();

  }

}
