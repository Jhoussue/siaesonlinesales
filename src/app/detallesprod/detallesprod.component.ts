import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../service/producto.service';
import { Producto } from 'src/model/producto';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CarritoService } from '../service/carrito.service';

@Component({
  selector: 'app-detallesprod',
  templateUrl: './detallesprod.component.html',
  styleUrls: ['./detallesprod.component.scss'],
})
export class DetallesprodComponent implements OnInit {
  id;
  codigo: string;
  producto: Producto[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private productoservice: ProductoService,
    private carritoservice: CarritoService
  ) {}
  imagenn: SafeUrl;
  n=1;
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.codigo = this.id;
    this.cargardetalles(this.codigo);
  }
  cargardetalles(codigo: string) {
    this.productoservice.listadetalles(codigo).subscribe(
      (data) => {
        this.producto = data;
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
  addcart(pro: Producto){
    for (let i = 0; i < this.n; i++){
    this.carritoservice.addcart(pro);
    }
  }
}
