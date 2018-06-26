import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Pagina2Page } from "../index.paginas";

/**
 * Generated class for the PrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  pagina2: any = Pagina2Page;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
  }

  navegarPagina(){

    this.navCtrl.push( Pagina2Page );

  }

}
