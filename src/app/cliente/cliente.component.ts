import { Component, OnInit } from '@angular/core';

import { CarritoService } from '../service/carrito.service';
import { Producto } from 'src/model/producto';
import { IPayPalConfig, ICreateOrderRequest, IPurchaseUnit } from 'ngx-paypal';
import { ProductoService } from '../service/producto.service';
import { PedidoOnline } from 'src/model/PedidoOnline';
import { Vali } from 'src/model/vali';
import { AlertaService } from '../service/alertas/alerta.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  pal: string;
  totalfinal = 0;
  p: Producto[] = [];
  productoss: Producto[] = [];
  productoss2: Producto[] = [];
  repepro: Producto[] = [];
  vali: Vali[] = [];
  vali2: Vali[] = [];
  array = [];
  t: number = 0;
  name = 'Angular';
  pay;
  conta = 0;
  j = 0;
  nn = 0;
  i = 0;
  bool = true;
  public payPalConfig?: IPayPalConfig;
  showSuccess;

  constructor(
    private carritoservice: CarritoService,
    private productoservice: ProductoService,
    private alertaservice: AlertaService
  ) {
    this.j = 0;
    this.conta = 0;
   

    this.pay = false;
    this.productoservice.detail(0, 0).subscribe((proo) => {
      this.productoss = proo;
    });
  }

  dui: string;
  ngOnInit(): void {
    this.initConfig();
    console.log('payPalConfig is ' + this.payPalConfig);
    this.dui = '1122222';
  }
  private initConfig(): void {
 this.p=[];
    this.carritoservice.cart$.subscribe((ppp) => {
      this.p = ppp;
    });
    this.total();
    this.vali=[];
    for (let po of this.p) {
      this.productoservice.listanombre(po.nombre).subscribe((proou) => {
        this.productoss2 = proou;
        for (let pe of this.productoss2) {
          console.log('prueba lista' + pe.existencia);
          this.j = 0;
          this.j = this.j + pe.existencia;

          let indice = this.p.indexOf(po);

          this.vali.push(new Vali(indice, this.j, pe.codproducto, 0));
        }
      });
    }
    this.payPalConfig = {
      
      currency: 'USD',
      clientId:
        'Aas84tosmUWzWVr99C9ahvZOXn-cCk-JLSlfgBPLn31tu9muT_D8fxDA3_9DGkxk-EOyC87-tpVPRjqC',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: '' + this.totalfinal,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: '' + this.totalfinal,
                  },
                },
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: '' + this.totalfinal,
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        this.conta = 0;
        var ji = 0;

        this.productoservice.detail(0, 0).subscribe((proo) => {
          this.productoss = proo;
        });

        for (let p1 of this.vali) {
          var total = 0;
          this.carritoservice.cart$.subscribe((Producto) => {
            Producto.forEach((elemento) => {
              if (elemento.codproducto === p1.codigo) {
                total += 1;
                let indice = this.vali.indexOf(p1);
                this.vali[indice].exis = total;
              }
            });
          });
        }
        this.vali2 = [...new Set(this.vali)];

        this.conta = total;

        for (let bo of this.vali2) {
          if (bo.exis > bo.existencia) {
            this.bool = false;
            this.carritoservice.deletetodo();
            this.alertaservice.showwarning('Lo sentimos no hay existencia de el producto que desea comprar','Notificacion');
          }
        }

        console.log('todo bien ' + this.bool);

        if (this.bool == true) {
          console.log('aqui1', data, actions);
          actions.order.get().then((details) => {
            console.log('aqui2 : ', details);
          });
          this.enviar();
          this.limpiarcarrito();
        }
      },
      onClientAuthorization: (data) => {
        if (this.bool == true) {
          console.log('aqui3', data);
          this.showSuccess = true;
          this.alertaservice.showsuccess('El producto sera enviado lo antes posible ','Exíto');
        }
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: () => {
        console.log('onClick');
      },
    };
  }
  palabra() {
    this.pal = 'holaaa';
  }

  total() {
    this.totalfinal = 0;
    for (let pp of this.p) {
      this.totalfinal = this.totalfinal + pp.precio;
    }
  }
  enviar(): void {
    for (let producto of this.p) {
      const pedi = new PedidoOnline(
        1,
        producto.nombre,
        producto.codproducto,
        1,
        1,
        1,
        producto.precio,
        producto.precio,
        this.totalfinal,
        this.dui
      );
      this.productoservice.carritolista(pedi).subscribe();
    }
  }
  activartransaccion() {
    this.pay = false;
  }
  activarpaypal() {
    this.pay = true;
    this.initConfig();
  }
  limpiarcarrito() {
    this.carritoservice.deletetodo();
  }
}
