import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { cartList, cartLists, pizzaList } from '../models/pizza-list';
import { HttpProvider } from '../providers/http-provider.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  pizzaLists: pizzaList[];
  cartLists: cartLists[] = [];
  isCartVisble: Subject<boolean> = new Subject<boolean>();
  setPizzaList(response: pizzaList[]) {
    this.pizzaLists = [...response];
  }
  getPizzaList(): pizzaList[] {
    return this.pizzaLists;
  }

  constructor(private httpProvider: HttpProvider) {
    this.pizzaLists && this.pizzaLists.length > 0 ? this.isCartVisble.next(true) : '';
  }
  getPizzaInfo(): Observable<any> {
    let url = 'https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68'
    return this.httpProvider.get(url);
  }
  updateCart(arg: cartList) {
    let index = -1;
    if (this.cartLists)
      index = this.cartLists.findIndex(list => (list.id == arg.id));
    if (index > -1) {
      this.cartLists[index].selections.push(arg.selection);
      this.cartLists[index].quantity++;
      this.cartLists[index].price += arg.price;
      this.isCartVisble.next(true) 
    }
    else {
      let response: cartLists = {
        id: arg.id,
        name: arg.name,
        selections: [arg.selection],
        quantity: 1,
        price: arg.price
      }
      this.cartLists.push(response);
      this.isCartVisble.next(true);
    }
  }
  getCartDetails(): cartLists[] {
    return this.cartLists;
  }
  getPizzaListOfId(id) {
    let i = this.cartLists.findIndex(list => (list.id == id));
    return this.pizzaLists[i];
  }
}
