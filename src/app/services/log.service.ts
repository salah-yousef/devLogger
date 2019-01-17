import { Injectable } from '@angular/core';
import { Log } from "../interfaces/log";
import { BehaviorSubject, Observable, of } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LogService {
  private logSource = new BehaviorSubject<Log>({id:null, text:null, date:null, amISelected:null});
  selectedLog = this.logSource.asObservable();
  
  logs: Log[] = [
    {id:'1',text:'salah',date: new Date('12/19/2012'),amISelected:false},
    {id:'2',text:'ali',date: new Date('12/18/2013'),amISelected:false},
    {id:'3',text:'ahmed',date: new Date('12/15/2014'),amISelected:false}
  ];
  constructor() { }

  getLogs() : Observable<Log[]>{
    return of(this.logs);
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
  }

  updateLog(log: Log) {
    this.logs.forEach((currentLog, i)=>{
      if(log.id === currentLog.id) {
        this.logs.splice(i, 1);
      }
    });
    this.logs.unshift(log);
  }

  deleteLog(log: Log){
    this.logs.forEach((currentLog, i)=>{
      if(log.id === currentLog.id) {
        this.logs.splice(i, 1);
      }
    });
  }
}
