import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Platform } from 'ionic-angular';

@Injectable()
export class AjustesProvider {

  ajustes = {
    mostrar_tutorial: true
  }

  constructor(
    private platform: Platform
  ) {
  }

  cargar_storage() {

    if( this.platform.is('cordova') ) {

    } else {

      // Escritorio

      if( localStorage.getItem('ajustes') ) {
        this.ajustes = JSON.parse( localStorage.getItem('ajustes') );
      }


    }

  }

  guardar_storage() {

    if( this.platform.is('cordova') ) {

    } else {

      // Escritorio

      localStorage.setItem('ajustes', JSON.stringify(this.ajustes));

    }

  }

}
