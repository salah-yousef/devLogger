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
    date: null  
  }
  constructor(
    private logService:LogService
  ) { }

  ngOnInit() {
    // subscribe to selected log observable
    this.logService.selectedLog.subscribe((log:Log) => {
      if(log.id !== null) {
        this.log.id = log.id;
        this.log.text = log.text;
        this.log.date = log.date;
      }
    });
  }

}
