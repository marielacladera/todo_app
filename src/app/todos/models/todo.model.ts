export class Todo {
  public id: number;
  public completed: boolean;
  public text: string;

  constructor(texto: string){
    this.id = new Date().getTime();
    this.completed = false;
    this.text = texto;
  }
}
