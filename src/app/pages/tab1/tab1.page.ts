import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(public  deseosService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController){
    
  }
  async agregarLista(){
    //
    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      //subHeader: 'Subtitle',
      //message: 'This is an alert message.',
      inputs: [
        {
          name:'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: 
      [{
        text: 'Cancelar',
        role: 'cancel',
        handler: ()=>{
          console.log('Cancelar');
        }       
      },
      {
        text: 'Crear',
        handler: (data) => {
          if(data.titulo.length != 0)  
          {
            console.log(data);
            let id = this.deseosService.crearLista(data.titulo);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${id}`);
          }
        }
      }]
    });

    alert.present();
  }
}
