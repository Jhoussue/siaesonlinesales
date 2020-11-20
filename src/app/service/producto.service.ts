import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, Subject } from 'rxjs';
import { Producto } from 'src/model/producto';
import { Departamento } from 'src/model/departamento';
import { Marca } from 'src/model/marca';
import {tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  url = 'http://localhost:8989/producto/';

  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) {}
  visible;
  depar: number;
 get refresh$(){
   return this._refresh$;
 }
  opcion(iddept:number){
    this.depar=iddept
  }
  public listadepar(): Observable<Departamento[]>{
    return this.http.get<Departamento[]>(this.url + 'listadepartamento');
  }
  public detail(id: number, idmar: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + `listadep/${id},${idmar}`)
    .pipe(
      tap(() =>{
        this._refresh$.next();
      })
    )
  }
  public listamarca(id: number): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.url + `listamarca/${id}`);
  }
  public rangos(pmin: number, pmax: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + `listaran/${pmin},${pmax}`);
  }
  public rangosdept(pmin: number, pmax: number , iddept: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + `listarandept/${pmin},${pmax},${iddept}`);
  }
  public marcass(mars: number, iddepta: number,pmin: number, pmax: number,
                 mod: string, color: string, talla: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + `listamarcastodas/${mars},${iddepta},${pmin},${pmax},${mod},${color},${talla}`);
  }
  public listasexo(id: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + `listasexo/${id}`);
  }
  public listacolor(id: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + `listacolor/${id}`);
  }
  public listamodelo(id: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + `listamodelo/${id}`);
  }
  public listatalla(id: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + `listatalla/${id}`);
  }
}
