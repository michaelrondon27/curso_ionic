import { Component } from '@angular/core';
import {
  ModalController,
  ToastController
} from 'ionic-angular';

import { SubirPage } from '../subir/subir';

import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';

// Plugins
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hayMas: boolean = true;

  constructor(
    private modalCtrl: ModalController,
    public _cap: CargaArchivoProvider,
    private socialSharing: SocialSharing,
    public toastCtrl: ToastController
  ) { }

  mostrar_modal() {

    let modal = this.modalCtrl.create( SubirPage );

    modal.present();

  }

  doInfinite( infiniteScroll ) {

    this._cap.cargar_imagenes().then( (resp: boolean) => {

      this.hayMas = resp;

      infiniteScroll.complete();

    });

  }

  compartir( post: any ) {

    this.socialSharing.shareViaWhatsApp( post.titulo, post.img, post.img ).then( () => {

    }).catch( (error) => {
      this.mostrar_toast(error);
    });

  }

  mostrar_toast( mensaje: string ) {

    this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    }).present();

  }

}
