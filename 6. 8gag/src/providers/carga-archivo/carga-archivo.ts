import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class CargaArchivoProvider {

  imagenes: ArchivoSubir[] = [];

  constructor(
    public toastCtrl: ToastController,
    public afDB: AngularFireDatabase
  ) {
    console.log('Hello CargaArchivoProvider Provider');
  }

  cargar_imagen_firebase( archivo: ArchivoSubir ) {

    let promesa = new Promise( (resolve, reject) => {

      this.mostrar_toast('Cargando...');

      let storageRef = firebase.storage().ref();
      let nombreArchivo: string = new Date().valueOf().toString();

      let uploadTask: firebase.storage.UploadTask = storageRef.child(`img/${nombreArchivo}`)
                                                              .putString( archivo.img, 'base64', { contentType: 'image/jpeg' } );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        () => { }, // saber el % de cuantos Mbs se han subido
        ( error ) => {
          // manejo de error
          console.log('ERROR EN LA CARGA');
          console.log(JSON.stringify( error ));
          this.mostrar_toast(JSON.stringify( error ));
          reject();
        },
        () => {
          // Todo bien!!
          console.log('Archivo subido');
          this.mostrar_toast('Imagen cargada correctamente');

          let url = uploadTask.snapshot.downloadURL;

          this.crear_post( archivo.titulo, url, nombreArchivo );
          
          resolve();
        }
      )

    });

    return promesa;

  }

  private crear_post( titulo: string, url: string, nombreArchivo: string ) {

    let post: ArchivoSubir = {
      img: url,
      titulo: titulo,
      key: nombreArchivo
    };

    this.afDB.object(`/post/${ nombreArchivo }`).update(post);

    this.imagenes.push( post );

  }

  mostrar_toast( mensaje: string ) {

    this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    }).present();

  }

}

interface ArchivoSubir {
    titulo: string;
    img: string;
    key?: string;
}
