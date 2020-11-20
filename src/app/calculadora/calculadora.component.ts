import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss'],
})
export class CalculadoraComponent implements OnInit {
  titulo = 'soy edwin';
  logo = 'assets/almacen.png';
  contadortotal = 0;
  suma = 0;
  resta = 0;
  texto: string;
  constructor() {}

  ngOnInit(): void {
    this.contadortotal=10;
    this.texto='10';
  }
  sumar(){
    this.contadortotal++;
    this.suma++;
  }
  restar(){
    this.contadortotal--;
    this.resta++;
  }
  reset(){
    this.contadortotal=+this.texto;
  }
}
