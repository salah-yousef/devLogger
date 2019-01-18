import { Component, OnInit } from '@angular/core';
import { Log } from "../../interfaces/log";
import { LogService } from "../../services/log.service";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit  {
  logs:Log[];
  
  constructor(
    private logService:LogService
  ) { }

  ngOnInit() {
    this.logService.logSource.subscribe(log => {
      this.logService.getLogs().subscribe((logs: Log[]) => {
        this.logs = logs;
      });
    });
  }

  onSelect(log: Log) {
    this.logService.setFormLog(log);
    let cur = this.logs.findIndex((value) => {
      return value.id === log.id;
    });
    this.logs[cur].amISelected = !this.logs[cur].amISelected;
    localStorage.setItem('logs', JSON.stringify(this.logs));
    
  }

  onDelete(log: Log) {
    if(confirm('Are you sure?')){
      this.logService.deleteLog(log);
      this.logs = JSON.parse(localStorage.getItem('logs')); 
    }
  }

}
