 export class PedidoOnline {
    cantidad: number;
    nombre: string;
    codproducto: string;
    tipo: number;
    idsucursal: number;
    n: number;
    precio: number;
    subtotal: number;
    total: number;
    dui: string;

    constructor(
        cantidad: number,
        nombre: string,
        codproducto: string,
        tipo: number,
        idsucursal: number,
        n: number,
        precio: number,
        subtotal: number,
        total: number,
        dui: string
    ) {
        this.cantidad = cantidad;
        this.nombre = nombre;
        this.codproducto = codproducto;
        this.tipo = tipo;
        this.idsucursal = idsucursal;
        this.n = n;
        this.precio = precio;
        this.subtotal = subtotal;
        this.total = total;
        this.dui = dui;
    }
}
