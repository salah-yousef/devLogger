import { Injectable } from '@angular/core';
import { Log } from "../interfaces/log";
import { BehaviorSubject, Observable, of } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LogService {
  private logSource = new BehaviorSubject<Log>({id:null, text:null, date:null});
  selectedLog = this.logSource.asObservable();
  
  logs: Log[] = [
    {id:'1',text:'salah',date: new Date('12/19/2012')},
    {id:'2',text:'ali',date: new Date('12/18/2013')},
    {id:'3',text:'ahmed',date: new Date('12/15/2014')}
  ];
  constructor() { }

  getLogs() : Observable<Log[]>{
    return of(this.logs);
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }
}
