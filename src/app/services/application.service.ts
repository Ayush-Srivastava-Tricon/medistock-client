import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  baseUrl:any ="https://drab-tan-caiman-gown.cyclic.app/"

  httpUrls:any={
    'getMedicine':'getStockDetail',
    'addMedicine':'add-medicine',
    'updateStock':'updateStock',
  }

  constructor(private http:HttpClient) { }

  fetchMedicineList(callback:any){
      return this.http.get(this.baseUrl+this.httpUrls['getMedicine']).subscribe((data:any)=>callback(data));
  }

  sortMedicine(data:any,sortBy:string){
      return data.sort((a:any,b:any)=>a[sortBy].localeCompare(b[sortBy]));
  }

  updateMediStock(params:any,callback:any){
    return this.http.put(this.baseUrl+this.httpUrls['updateStock'],params).subscribe((data:any)=>callback(data));
  }
}
