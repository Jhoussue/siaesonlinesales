import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { MenuComponent } from './menu/menu.component';
import { ProductoComponent } from './producto/producto.component';
import { Ng5SliderModule } from 'ng5-slider';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetallesprodComponent } from './detallesprod/detallesprod.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPayPalModule} from 'ngx-paypal';
import { CarritocompraComponent } from './carritocompra/carritocompra.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CantidadPipe } from './cantidad.pipe';
import { UnicoPipe } from './unico.pipe';
import { ClienteComponent } from './cliente/cliente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng5SliderModule,
    NgbModule,
    NgxPayPalModule,
    NgxPaginationModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    
  ],
  declarations: [
    AppComponent,

    CalculadoraComponent,

    MenuComponent,

    ProductoComponent,

    HomeComponent,

    DetallesprodComponent,

    CarritocompraComponent,

    CarritoComponent,

    CantidadPipe,

    UnicoPipe,

    ClienteComponent,
    
  ],
 
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
