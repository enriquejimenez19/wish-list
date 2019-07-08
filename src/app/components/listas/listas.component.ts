import { Component, Input } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent{
  @Input() terminada = true;

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController) { }

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

  listaSeleccionada(lista: Lista){
    if (this.terminada)
    {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }else{ 
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarLista(lista: Lista){
    this.deseosService.borrarLista(lista);
  }

  async editarLista(lista: Lista, slidingItem: IonItemSliding){
    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      //subHeader: 'Subtitle',
      //message: 'This is an alert message.',
      inputs: [
        {
          name:'titulo',
          type: 'text',
          value: lista.title,
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
        text: 'Editar',
        handler: (data) => {
          if(data.titulo.length != 0)  
          {
            console.log(data);
            console.log(lista.id);
            this.deseosService.editarLista(lista.id, data.titulo);
            slidingItem.close();
            this.router.navigateByUrl(``);
          }
        }
      }]
    });
    alert.present();

  }
}
