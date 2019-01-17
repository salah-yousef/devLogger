import { Component, OnInit } from '@angular/core';
import { Log } from "../../interfaces/log";
import { LogService } from "../../services/log.service";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs:Log[];
  constructor(
    private logService:LogService
  ) { }

  ngOnInit() {
    this.logService.getLogs().subscribe((logs: Log[]) => {
      this.logs = logs;
    });
  }

  onSelect(log: Log) {
    this.logService.setFormLog(log);
   //log.amISelected =! log.amISelected;
   this.logService.getLogs().subscribe(logs => {
      logs.forEach((curlog) =>{
        if (curlog.id === log.id) {
          curlog.amISelected =! curlog.amISelected;
        }
      });
   });
  }

  onDelete(log: Log) {
    if(confirm('Are you sure?')){
      this.logService.deleteLog(log);
    }
  }

}
