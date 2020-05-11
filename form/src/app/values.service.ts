import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {

  private REST_API_SERVER = 'http://109.103.122.99:20072/resources';

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(){
    console.log('something else');
    return this.httpClient.get(this.REST_API_SERVER);
  }
}
