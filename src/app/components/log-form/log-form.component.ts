import { Component, OnInit } from '@angular/core';
import { LogService } from "../../services/log.service";
import { Log } from "../../interfaces/log";

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  log: Log = {
    id: '',
    text: '',
    date: null,
    amISelected: false  
  }
  isNew: boolean = true;
  constructor(
    private logService:LogService
  ) { }

  ngOnInit() {
    // subscribe to selected log observable
    this.logService.selectedLog.subscribe((log:Log) => {
      if(log.id !== null) {
        this.isNew = false;
        this.log.id = log.id;
        this.log.text = log.text;
        this.log.date = log.date;
        this.log.amISelected = log.amISelected;
      }
    });
  }

  onSubmit() {
    
    if(this.isNew) {
      const newLog = {
        id: this.logService.uuidv4(),
        text: this.log.text,
        date: new Date(),
        amISelected: false
      }
      this.logService.addLog(newLog);
      this.logService.setFormLog(newLog);
    } else {
      const currentLog = {
        id: this.log.id,
        text: this.log.text,
        date: new Date(),
        amISelected: false
      }
      this.logService.updateLog(currentLog);
      this.logService.setFormLog(currentLog);
    }

    this.clearState(false);
  }

  clearState(flag: boolean) {
    this.isNew = true;
    this.log.id = '';
    this.log.text = '';
    this.log.date = null;
    this.logService.getLogs().subscribe(logs => {
      logs.forEach((log) =>{
        log.amISelected = false;
      })
      localStorage.setItem('logs', JSON.stringify(logs));
      if (flag) {
        this.logService.setFormLog(this.log);
      }
    });
  }

}
