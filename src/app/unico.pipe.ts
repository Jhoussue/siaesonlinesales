import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from 'src/model/producto';

@Pipe({
  name: 'unico'
})
export class UnicoPipe implements PipeTransform {
  groupedProducts: any[] = [];
  transform(value: Producto[], refreshValue?: any): any {
    value.forEach(product => {
      if(this.groupedProducts.length == 0) {
        this.groupedProducts.push(Object.assign(product, {quantity: 1}));
      } else {
        let repeatedProduct = this.groupedProducts.findIndex(p => p.codproducto == product.codproducto);
        if(repeatedProduct == -1) {
          this.groupedProducts.push(Object.assign(product, {quantity: 1}));
        } else {
          this.groupedProducts[repeatedProduct].quantity += 1; 
        }
      }
    })

    return this.groupedProducts;
  }

}
