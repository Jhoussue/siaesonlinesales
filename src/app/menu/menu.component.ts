import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Departamento } from 'src/model/departamento';
import { ProductoService } from '../service/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/model/producto';
import { CarritoService } from '../service/carrito.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  logo = 'assets/logoo.png';
  public isCollapsed = true;
  j: number;
  producto: Producto[];
  @Input() v: number;
  n: number = 0;
  totalfinal=0;
  total$: Observable<number>;
  p: Producto[] = [];
  totaldolares$: Observable<number>;
  constructor(
    private personaService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private carritoService: CarritoService
  ) {
    this.carritoService.cart$.subscribe((ppp) => {
      this.p = ppp;
    });
    this.total();
   this.total$ = this.carritoService.cart$
      .pipe(map((Producto) => Producto.length));

    
  }
  departamento: Departamento[];
  dep: number;
  nombre: string;
  op: string = '#collapseExample';
  numero: number;
  ngOnInit(): void {
    this.cargardepartamento();
    this.carritoService.cart$.subscribe((ppp) => {
      this.p = ppp;
      this.totalfinal=0;
      for (let pp of this.p) {
        this.totalfinal=this.totalfinal+pp.precio;
      }
      console.log('total en menu ngonit: '+this.totalfinal);
    });
  }
  prueba(n: number) {
    this.numero = n;
  }
  cargardepartamento(): void {
    this.personaService.listadepar().subscribe(
      (data) => {
        this.departamento = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cargarproducto(idt: number): void {
    this.personaService.detail(idt, 0).subscribe(
      (data) => {
        this.producto = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ruta(id: number) {
    this.router.navigate(['/productos', id]);
  }
  rutanombre(nombres: string) {
    this.router.navigate(['/productos', nombres]);
    this.isCollapsed = true;
  }
  ruta2(id: number) {
    window.location.reload();
  }
  menuopciones(i: number) {
    this.op = '#collapseExample' + i;
  }
  submenu() {
    this.isCollapsed = false;
  }
  indicee(i: number, idp: number) {
    this.cargarproducto(idp);
    this.j = i;
    this.submenu();
  }
  total() {
    this.totalfinal=0;
    for (let pp of this.p) {
      this.totalfinal=this.totalfinal+pp.precio;
    }
  }
}
