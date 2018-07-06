import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo: string;
  imagenPreview: string;

  constructor(
    private viewCtrl: ViewController,
    private camera: Camera
  ) {
  }

  cerrar_modal() {

    this.viewCtrl.dismiss();

  }

  mostrar_camara() {

    const options: CameraOptions = {
      quality: 30,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):

     this.imagenPreview = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {

      console.log( 'Error en camara', JSON.stringify(err) );

    });

  }

}
