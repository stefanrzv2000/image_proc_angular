import { Component, OnInit } from '@angular/core';
import {Config, ConfigService} from '../config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  configService: ConfigService;
  config;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  ngOnInit(): void {
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe((data: Config) => this.config = {
        ...data
      });
  }

}
