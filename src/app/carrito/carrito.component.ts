import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/model/producto';
import { CarritoService } from '../service/carrito.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { ProductoService } from '../service/producto.service';
import { Validacion } from 'src/model/validacion';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  product$: Observable<Producto[]>;
  suscripttion: Subscription;
  p: Producto[] = [];
  refre=0;
  totalfinal=0;
  vali:Validacion;
  constructor(
    private carritoservice: CarritoService,
    private productoservice: ProductoService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    // tslint:disable-next-line: only-arrow-functions
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof onanimationend) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
    this.refre=Math.floor(Math.random() * (100000 - 7 + 1)) + 2;
  }
  imagenn: SafeUrl;
  ngOnInit(): void {
    this.product$ = this.carritoservice.cart$;
    this.carritoservice.cart$.subscribe((ppp) => {
      this.p = ppp;
      this.totalfinal=0;
      for (let pp of this.p) {
        this.totalfinal=this.totalfinal+pp.precio;
      }
      console.log('total en ngonit: '+this.totalfinal);
    });
    this.total();
  }

  cargarimagen(imm: string): void {
    this.imagenn = this.sanitizer.bypassSecurityTrustUrl(
      'data:image/jpeg;base64,' + imm
    );
  }
  addcart(pro: Producto) {
    console.log('añadir al carrito');
    this.carritoservice.addcart(pro);
  }
  deletes(n: Producto) {
    this.carritoservice.delete(n);
    this.ngOnInit();
    console.log('carrito array');
    console.log(this.product$);
  }
  total() {
    this.totalfinal=0;
    for (let pp of this.p) {
      this.totalfinal=this.totalfinal+pp.precio;
    }
    console.log('total: '+2);
  }
  rutacodigo(codigo: string) {
    this.router.navigate(['/detalles', codigo]);
  }
llenarvali(nu: number,s: string){
this.vali= new Validacion(nu,nu,s)
}
}
