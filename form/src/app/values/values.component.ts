import { Component, OnInit } from '@angular/core';
import {ValuesService} from '../values.service';

export interface Types{
  contents: string[];
}

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit {

  types: Types;

  constructor(private valuesService: ValuesService) { }

  ngOnInit(): void {
    this.valuesService.sendGetRequest().subscribe((data) => {
      console.log(data);
      this.types = (data as Types);
    });
  }

}
