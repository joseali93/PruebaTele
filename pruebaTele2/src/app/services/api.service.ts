import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _http:HttpClient
  ) { }
  getInformation():Observable<any>{
    return this._http.get(environment.url+'subscribers')
  }
  setInformation(info):Observable<any>{
    return this._http.post(environment.url+'subscribers',info)
  }
  getaPost(){
    return this._http.get(environment.url_2+'posts/1')
  }
  setPosts(info){
    return this._http.post(environment.url+'any',info)
  }
  getmultiplePosts(){
    return this._http.get(environment.url_2+'posts')
  }
  getInternalPost(){
    return this._http.get(environment.url+'any')
  }
}
