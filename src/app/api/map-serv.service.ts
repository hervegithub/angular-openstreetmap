import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMap } from '../Interface/imap';


@Injectable({
  providedIn: 'root'
})
export class MapServService {
   
  urlMap='https://df6c81ef.ngrok.io/api/sites'
  urlMapP='https://df6c81ef.ngrok.io/api/sitesS'
  formD: FormData;
  constructor(private httpMap : HttpClient) { }


  // selectFile = null;
  //  onFileChanged(event) {
  //    this.selectFile = event.target.files[0];
  //  }


  getAllData():Observable<object>{
    return this.httpMap.get<object>(this.urlMap);
  }
  getEntity(type):Observable<object>{
    return this.httpMap.get<object>(this.urlMap+'/type/'+type);
  }
  ajouSite(InMap : IMap){
     this.formD = new FormData();
     this.formD.append("nom",InMap.nom);
     this.formD.append("adresse",InMap.adresse);
     this.formD.append("description",InMap.description);
     this.formD.append("ville",InMap.ville);
     this.formD.append("pays",InMap.pays);
     this.formD.append("type",InMap.type);
     this.formD.append("latitude",InMap.latitude);
     this.formD.append("longitude",InMap.longitude);
     this.formD.append("image",InMap.image);
     return this.httpMap.post(this.urlMapP,this.formD);
  }
  
}
