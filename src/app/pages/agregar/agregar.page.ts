import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  nombreItem: string;
  lista: Lista;

  constructor(private deseosService: DeseosService,
              private route: ActivatedRoute) { 
    const listaId = this.route.snapshot.paramMap.get('listaId');
    this.lista = this.deseosService.obtenerLista(listaId);
  }

  ngOnInit() {
  }
  
  agregarItem(){
    if(this.nombreItem.length != 0)
    {
      const nuevoItem = new ListaItem(this.nombreItem);
      this.lista.items.push(nuevoItem);
      this.deseosService.guardarStorage();
      this.nombreItem = '';
    }
  }

  cambioCheck(item: ListaItem){
    const pendientes = this.lista.items.filter(itemData =>{
      return !itemData.completed;
    }).length;  
    if (pendientes === 0){
      this.lista.ended = true;
      this.lista.endDate = new Date();
    }else{
      this.lista.ended = false;
      this.lista.endDate = null;
    }

    this.deseosService.guardarStorage();
    console.log(this.deseosService.listas);
  }

  borrar(i: number){
    this.lista.items.splice(i,1);
    this.deseosService.guardarStorage();
  }
}
