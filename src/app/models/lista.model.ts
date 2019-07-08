import { ListaItem } from './lista-item.model';

export class Lista{
    id: number;
    title: string;
    createDate: Date;
    endDate: Date;
    ended: boolean;
    items: ListaItem[];

    constructor(title: string ){
        this.title = title;
        this.createDate = new Date();
        this.ended = false;
        this.items = [];
        this.id = new Date().getTime();
    }
}