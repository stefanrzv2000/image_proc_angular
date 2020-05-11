import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Types } from '../values/values.component';
import {ValuesService} from '../values.service';
import {UploadService} from '../upload.service';
import {Router} from '@angular/router';
import {Result} from '../result/result.component';

interface Disease {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  types: Types;
  diseases: Disease[];
  private y: Result;

  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef; files = [];
  selected: any;
  constructor(private valuesService: ValuesService,
              private uploadService: UploadService,
              private router: Router) { }

  ngOnInit(): void {
    this.valuesService.sendGetRequest().subscribe((data) => {
      console.log(data);
      this.types = (data as Types);
      this.diseases = [];
      for (const content of this.types.contents){
        this.diseases.push({
          value: 'breast',
          viewValue: content
        });
      }
    });
  }

  uploadFile(file) {
    const formData = new FormData();
    console.log(file);
    formData.append('image_to_process', file.data, 'breast_123.png');
    // formData.append('filename', file.name);
    file.inProgress = true;
    const x = this.uploadService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        console.log(event.body);
        this.y = event.body as unknown as Result;
        this.router.navigate(['/result', this.y] ).then(r => {});
      }
    });

    /*console.log('response');
    console.log(x);
    this.y = x as unknown as Result;
    this.router.navigate(['/result'], {
      state: this.y
    }).then(r => {});*/
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  onClick() {
    console.log('clicked');
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < fileUpload.files.length; index++)
      {
        const file = fileUpload.files[index];
        file.filename = 'breast_5.png';
        // file.name = 'breast_5.png';
        this.files.push({ data: file, inProgress: false, progress: 0});
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }




}
