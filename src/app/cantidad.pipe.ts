import { Pipe, PipeTransform } from '@angular/core';
import { CarritoService } from './service/carrito.service';
import { Producto } from 'src/model/producto';

@Pipe({
  name: 'cantidad'
})
export class CantidadPipe implements PipeTransform {
  products: Producto[];
  constructor(private carritoservice: CarritoService){

  }

  transform(product: any, args?: any): any {
    var total = 0;
    this.carritoservice.cart$.subscribe(Producto => {
      Producto.forEach((elemento) => {
        if(elemento.codproducto === product.codproducto){
          total += 1;
        }
      });
    });
    return total;
  }

}
