import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Item } from '../models/item.model';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  //The url for the server which expose the api
  private basicUrl = window.location.protocol + "//" + window.location.hostname + ":8080/items"; //'http://localhost:8080/items';

  constructor(private http: Http) { }

  getAllItems() {
    return this.http.get(this.basicUrl).pipe(map(res => res.json()));
  }

  addItem(item: Item) {
    
    return this.http.post(this.basicUrl + '/add', item).pipe(map(res => res.json()));
  }

  deleteItem(itemNum : number) {
    return this.http.delete(this.basicUrl + '/delete/' + itemNum).pipe(map(res => res.json()));
  }

  withdrawQuantity(itemNum: number, quantity : number) {
    return this.http.get(this.basicUrl + '/edit/' + itemNum +'/withdraw/'+ quantity).pipe(map(res => res.json()));
  }

  depositQuantity(itemNum: number, quantity : number) {
    return this.http.get(this.basicUrl + '/edit/' + itemNum +'/deposit/'+ quantity).pipe(map(res => res.json()));
  }

  updateItem(item: Item) {
    return this.http.put(this.basicUrl + '/edit/' + item._itemNum, item).pipe(map(res => res.json()));
  }

  getItemById(itemNum: number) {
    return this.http.get(this.basicUrl + '/find/' + itemNum).pipe(map(res => res.json()));
  }
}
