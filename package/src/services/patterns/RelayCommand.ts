import { makeAutoObservable, observable } from "mobx";
import { ICommand } from "./ICommand";

export class RelayCommand implements ICommand {
  
  @observable content: any = null;
  execute: (parameter?: any) => void;
  canExecute: (parameter?: any) => boolean;

  constructor(x: {
    content: any, 
    execute: (parameter?: any) => void, 
    canExecute?: (parameter?: any) => boolean
  }) {
    makeAutoObservable(this);
    
    this.content = x.content;
    this.execute = x.execute;
    this.canExecute = x.canExecute || (() => true);
  }
}
