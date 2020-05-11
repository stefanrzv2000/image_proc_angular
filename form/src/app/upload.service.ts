import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
// tslint:disable-next-line:import-spacing
import { map } from  'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  SERVER_URL = 'http://109.103.122.99:20072/upload';
  constructor(private httpClient: HttpClient) { }

  public upload(formData) {
    return this.httpClient.post(this.SERVER_URL, formData, {
      reportProgress: true,
      observe: 'events'
    });
    /*console.log(typeof x);
    console.log(x);
    return x;*/
  }

}
