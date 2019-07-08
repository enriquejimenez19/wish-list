export class ListaItem{
    description: string;
    completed: boolean;

    constructor(desc: string){
        this.description = desc;
        this.completed = false;
    }
}