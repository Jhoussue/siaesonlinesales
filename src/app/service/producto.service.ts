import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, Subject } from 'rxjs';
import { Producto } from 'src/model/producto';
import { Departamento } from 'src/model/departamento';
import { Marca } from 'src/model/marca';
import { tap } from 'rxjs/operators';
import { PedidoOnline } from 'src/model/PedidoOnline';
@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  url = 'http://localhost:8989/producto/';

  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) {}
  visible;
  depar: number;
  get refresh$() {
    return this._refresh$;
  }
  opcion(iddept: number) {
    this.depar = iddept;
  }
  public listadepar(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.url + 'listadepartamento');
  }
  public detail(id: number, idmar: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + `listadep/${id},${idmar}`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  public listamarca(id: number,nombre: string): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.url + `listamarca/${id},${nombre}`);
  }
  public listamarcacod(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.url + `listamarcacod`);
  }
  public rangos(pmin: number, pmax: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + `listaran/${pmin},${pmax}`);
  }
  public rangosdept(
    pmin: number,
    pmax: number,
    iddept: number
  ): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      this.url + `listarandept/${pmin},${pmax},${iddept}`
    );
  }
  public marcass(
    mars: number,
    iddepta: number,
    pmin: number,
    pmax: number,
    mod: string,
    color: string,
    talla: string,
    sexo: string,
    nombre: string
  ): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      this.url +
        `listamarcastodas/${mars},${iddepta},${pmin},${pmax},${mod},${color},${talla},${sexo},${nombre}`
    );
  }
  public listasexo(id: number, nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + `listasexo/${id},${nombre}`);
  }
  public listacolor(id: number, nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + `listacolor/${id},${nombre}`);
  }
  public listamodelo(id: number, nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + `listamodelo/${id},${nombre}`);
  }
  public listatalla(id: number, nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + `listatalla/${id},${nombre}`);
  }
  public listanombre(nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + `listanombre/${nombre}`);
  }
  public listadetalles(codigo: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + `listadetalles/${codigo}`);
  }
  public carritolista(pedi: PedidoOnline): Observable<any> {
   
    return this.http.post<any>(this.url + 'create',pedi);
  }
}
