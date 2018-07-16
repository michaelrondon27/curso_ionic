import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-pagina2',
  templateUrl: 'pagina2.html',
})
export class Pagina2Page {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ir_pagina3() {

    this.navCtrl.push( 'mi-pagina3' );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload');
  }

  ionViewCanEnter() {
    console.log('ionViewCanEnter');

    let promesa = new Promise( (resolve, reject) => {

      let confirmar = this.alertCtrl.create({
        title: '¿Seguro?',
        subTitle: '¿Esta seguro que desea entrar?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => resolve(false)
          },
          {
            text: 'Seguro!',
            handler: () => resolve(true)
          }
        ]
      });

      confirmar.present();

    });

    return promesa;

    // let numero = Math.round( Math.random() * 10 );
    // console.log(numero)
    //
    // if ( numero >= 3 ) {
    //   return true;
    // } else {
    //   return false;
    // }

  }

  ionViewCanLeave() {
    console.log('ionViewCanLeave');

    console.log("Espera 2 segundos para salir");

    let loading = this.loadingCtrl.create({
      content: 'Espere por favor...'
    });

    loading.present();

    let promesa = new Promise( (resolve, reject) => {

      setTimeout( () => {
        loading.dismiss();
        resolve(true);
      }, 2000);

    });

    return promesa;
  }

}
