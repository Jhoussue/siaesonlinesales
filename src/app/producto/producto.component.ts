import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/model/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Departamento } from 'src/model/departamento';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from 'src/model/marca';
import { Options } from 'ng5-slider';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {
  @Input() visibleSidebar2 = null;
  visible2;
  vi;
  suscripcion: Subscription;
  constructor(
    private personaService: ProductoService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
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
  }
  visibleSidebar1 = this.personaService.visible;
  imagenn: SafeUrl;
  imagenn2: SafeUrl;
  producto: Producto[];
  productose: Producto[];
  productose2: Producto[];
  productoco: Producto[];
  productoco2: Producto;
  productomo: Producto[];
  productomo2: Producto;
  productota: Producto[];
  productota2: Producto;
  valprecio: number;
  departamento: Departamento[];
  marca: Marca[];
  marca2: any = null;
  n: string[] = [];
  iddepart: number = 0;
  rangeValues: number[] = [];
  max: number = 0;
  min: number = 0;
  maxmin: number[] = [];
  mar: number;
  mo: string[] = [];
  mod: string;
  color: string;
  talla: string;
  minimo: number = 40;
  maximo: number = 60;
  id;
  options: Options = {
    floor: 0,
    ceil: 1000,
  };
  iddd: number = 0;
  ngOnInit(): void {
    this.cargardepartamento();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.iddd = +this.id;

    this.cargaropcion(this.iddd);
    this.suscripcion = this.personaService.refresh$.subscribe(() => {
      this.cargaropcion(this.iddd);
    });
  }
  cargaropcion(idde: number): void {
    this.iddepart = idde;
    this.cargarproducto(idde);
    this.cargarmarca(idde);
    this.vi = false;
    this.visibleSidebar1 = false;
    this.mar = 0;
    this.marca2.idmarca = 0;
    delete this.productomo2;
    delete this.productoco2;
    delete this.productota2;
    this.rangeValues = [];
    this.maxmin = [];
    this.mo = [];
  }
  cargarproducto(idt: number): void {
    this.personaService.detail(idt, 0).subscribe(
      (data) => {
        this.producto = data;
        this.maxmin = [];
        this.max = 0;
        this.min = 0;
        this.rangeValues = [];
        for (const pro of this.producto) {
          if (pro.precio > this.max) {
            this.max = 0;
            this.max = pro.precio;
          }

          if (pro.precio <= this.max) {
            this.min = 0;
            this.min = pro.precio;
          }
        }
        this.minimo = this.min;
        this.maximo = this.max;
        this.options = {
          floor: this.minimo - 1,
          ceil: this.maximo + 1,
        };
      },
      (err) => {
        console.log(err);
      }
    );
  }
  cargarproductoidmarc(idmarca: number) {
    this.personaService.detail(this.iddepart, idmarca).subscribe(
      (data) => {
        this.producto = data;
      },
      (err) => {
        console.log(err);
      }
    );
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
  cargarimagen(imm: string): void {
    this.imagenn = this.sanitizer.bypassSecurityTrustUrl(
      'data:image/jpeg;base64,' + imm
    );
  }

  cargarmarca(idt: number) {
    this.personaService.listamarca(idt).subscribe(
      (data) => {
        this.marca = data;
      },
      (err) => {
        console.log(err);
      }
    );
    this.cargarsexo(idt);
    this.cargarcolor(idt);
    this.cargarmodelo(idt);
    this.cargartalla(idt);
  }
  limpiar() {
    this.marca2.idmarca = 0;
    delete this.productomo2;
    delete this.productoco2;
    delete this.productota2;
  }
  cargarproductorangos(): void {
    this.personaService
      .rangosdept(this.rangeValues[0], this.rangeValues[1], this.iddepart)
      .subscribe(
        (data) => {
          this.producto = data;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  cargarmars(): void {
    this.visibleSidebar2 = false;
    this.mar = 0;

    if (this.marca2 != null) {
      this.mar = this.marca2.idmarca;
    }
    this.mod = '.';

    if (this.productomo2 != null) {
      this.mod = this.productomo2.modelo;
    }

    this.color = '.';

    if (this.productoco2 != null) {
      this.color = this.productoco2.color;
    }
    this.talla = '.';

    if (this.productota2 != null) {
      this.talla = this.productota2.talla;
    }
    this.personaService
      .marcass(
        this.mar,
        this.iddepart,
        this.minimo,
        this.maximo,
        this.mod,
        this.color,
        this.talla
      )
      .subscribe(
        (data) => {
          this.producto = data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  cargarsexo(idt: number) {
    this.personaService.listasexo(idt).subscribe(
      (data) => {
        this.productose = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  cargarcolor(idt: number) {
    this.personaService.listacolor(idt).subscribe(
      (data) => {
        this.productoco = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  cargarmodelo(idt: number) {
    this.personaService.listamodelo(idt).subscribe(
      (data) => {
        this.productomo = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  cargartalla(idt: number) {
    this.personaService.listatalla(idt).subscribe(
      (data) => {
        this.productota = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
