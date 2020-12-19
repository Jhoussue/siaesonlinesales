import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoComponent } from './producto/producto.component';
import { HomeComponent } from './home/home.component';
import { DetallesprodComponent } from './detallesprod/detallesprod.component';

import { CarritoComponent } from './carrito/carrito.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CarritocompraComponent } from './carritocompra/carritocompra.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'carrito', component: CarritoComponent},
  {path: 'cliente', component: ClienteComponent},
  {path: 'paypal', component: CarritocompraComponent},
  {path: 'carrito/:id', component: CarritoComponent},
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'productos/:id', component: ProductoComponent},
  {path: 'detalles/:id', component: DetallesprodComponent},
  {path: 'productos', component: ProductoComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
