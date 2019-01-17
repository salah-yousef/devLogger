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
    {id:this.uuidv4(),text:'salah',date: new Date('12/19/2012'),amISelected:false},
    {id:this.uuidv4(),text:'ali',date: new Date('12/18/2013'),amISelected:false},
    {id:this.uuidv4(),text:'ahmed',date: new Date('12/15/2014'),amISelected:false}
  ];
  constructor() { }

  getLogs() : Observable<Log[]>{
    if (localStorage.getItem('logs') != null) {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    
    return of(this.logs.sort((a, b) => {
      return (new Date(b.date).getTime()) - (new Date(a.date).getTime());
    }));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((currentLog, i)=>{
      if(log.id === currentLog.id) {
        this.logs.splice(i, 1);
      }
    });
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log){
    this.logs.forEach((currentLog, i)=>{
      if(log.id === currentLog.id) {
        this.logs.splice(i, 1);
      }
    });
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  uuidv4() {
    return ([1e7] as any +-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }
}
