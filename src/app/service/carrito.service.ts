import { Injectable } from '@angular/core';
import { Producto } from 'src/model/producto';
import { BehaviorSubject, Subject, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Carrito } from 'src/model/carrito';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private products: Producto[] = [];
  private carri: Carrito[] = [];
  private cart = new BehaviorSubject<Producto[]>([]);

  cart$ = this.cart.asObservable();
  private cart2 = new BehaviorSubject<Carrito[]>([]);

  cart2$ = this.cart2.asObservable();

  i = 0;
  t = 0;
  j = 0;

  constructor() {}
  addcart(product: Producto) {
    this.j = 0;
    for (let p of this.products) {
      if (p.codproducto === product.codproducto) {
        this.j++;
      }
    }
    if (this.j < product.existencia) {
      this.products = [...this.products, product];
      this.cart.next(this.products);
    }
    console.log(this.j);
  }
  delete(n: Producto) {
    this.t = 0;
    this.i = 0;
    for (let p of this.products) {
      if (p.codproducto === n.codproducto) {
        this.t = this.i;
      }
      this.i++;
    }

    this.products.splice(this.t, 1);
    this.cart.next(this.products);
    console.log('eliminarrrr');
    console.log(this.t);
    console.log('array');
    console.log(this.products);
  }
  deleteexis(n: number,j: number) {
   
   for( var _i = 0; _i < j; _i++){
    this.products.splice(n, 1);
    this.cart.next(this.products);
   }
    
   
  }
  deletetodo() {
    this.products = [];
    this.cart.next(this.products);
  }
}
