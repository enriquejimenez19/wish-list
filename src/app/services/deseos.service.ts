import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  public listas: Lista[] = [];

  constructor() {
    this.cargarStorage();
  }

  crearLista(tituloLista: string){
    const nuevaLista = new Lista(tituloLista);
    this.listas.push(nuevaLista);
    this.guardarStorage();
    return nuevaLista.id;
  }

  guardarStorage(){
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage(){
    if(localStorage.getItem('data'))  
    {  
      this.listas = JSON.parse(localStorage.getItem('data'));
    }else
    {
      this.listas = [];
    }
  }

  obtenerLista(id: string | number){
    id = Number(id);

    return this.listas.find( listaData => {
      return listaData.id === id;
    });
  }

  borrarLista(lista: Lista){
    this.listas = this.listas.filter( listaData => {
      return (listaData.id !== lista.id);
    });

    this.guardarStorage();
  }

  editarLista(id: number, new_title: string){

    for (let i in this.listas){
      if(this.listas[i].id == id)
      {
        this.listas[i].title = new_title;
      }
    }

    this.guardarStorage();
  }

}
