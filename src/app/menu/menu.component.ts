import { Component, OnInit } from '@angular/core';
import { Departamento } from 'src/model/departamento';
import { ProductoService } from '../service/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  logo = 'assets/logoo.png';
  constructor(
    private personaService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  departamento: Departamento[];
  dep: number;
  ngOnInit(): void {
    this.cargardepartamento();
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
  ruta(id: number) {
   
    
    this.router.navigate(['/productos', id]);
    
  }
  ruta2(id: number) {
    window.location.reload();
   
  }
}
