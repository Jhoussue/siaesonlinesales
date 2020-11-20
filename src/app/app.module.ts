import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{FormsModule} from '@angular/forms'
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { MenuComponent } from './menu/menu.component';
import { ProductoComponent } from './producto/producto.component';
import { Ng5SliderModule } from 'ng5-slider';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,

    CalculadoraComponent,

    MenuComponent,

    ProductoComponent,

    HomeComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,  FormsModule, Ng5SliderModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
