import { Injectable } from '@angular/core';
import { CajaStorageService } from '../caja/caja-storage.service';
import { EstadoCajaService } from '../caja/estado-caja.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class GetInfoService {
  nombreUsuario!: string;
  listadoPatentes: string[] = [];
  sesionCajaId: any;
  sesionCajaApertura: any;
  sesionCajaCierre: any;
  saldoCaja: number;
  cajaOps = [];
  saldoInicialCaja:number;
  cantEgresosVehiculos: number

  private user$: any;
  private playa$: any;
  private sesionCaja$: any;
  private saldoCaja$: number;
  private cajaOps$: [];

  constructor(
    private storageService: StorageService,
    private cajaStorageService: CajaStorageService,
    private estadoCajaService: EstadoCajaService
  ) {
    this.storageService.usuario$.subscribe((data) => (this.user$ = data)),
   
      this.estadoCajaService.sesionCaja$.subscribe(
        (data) => (this.sesionCaja$ = data)
      );
    this.cajaStorageService.saldo$.subscribe(
      (data) => (this.saldoCaja$ = data)
    );
    this.cajaStorageService.data$.subscribe((data) => (this.cajaOps$ = data));
  }

  getUser() {
    this.nombreUsuario = this.user$['displayName'];
  }

  listarPatentes() {
    let playa = this.playa$;

    //recorre playa buscando barcode
    for (var it of playa) {
      let pat = it['patente'];
      // console.log(cod, pat);
      this.listadoPatentes.push(pat);
    }
    console.log('aver 2', this.listadoPatentes);
  }

  getSesionCaja() {
    this.sesionCajaId = this.sesionCaja$.id;
    this.sesionCajaApertura = this.sesionCaja$.apertura;
  }

  resetAll() {
    this.nombreUsuario = '';
    this.listadoPatentes = [];
    this.sesionCajaId = '';
    this.sesionCajaApertura = '';
    this.sesionCajaCierre = '';
    this.saldoCaja = 0;
    this.cajaOps = [];
    this.saldoInicialCaja=0
    this.cantEgresosVehiculos=0
  }

  getCajaOps() {
    this.saldoCaja = this.saldoCaja$;
    this.cajaOps = this.cajaOps$;
  }

  getSaldoInicialCaja() {
    this.getCajaOps()
    this.saldoInicialCaja =
      this.cajaOps.find((t) => t['operacion'] === 'apertura')?.['importe'] || 0;
  }

  getCierreCaja() {
    this.resetAll();
    this.getUser();
    this.listarPatentes();
    this.getSesionCaja();
    this.sesionCajaCierre = new Date();
    this.getCajaOps();
    this.getSaldoInicialCaja()
    this.countEgresosVehiculos()  
  }

  // countEgresosVehiculos() {
  //   this.getCajaOps();
  //   this.cantEgresosVehiculos = this.cajaOps.filter((t) => t['operacion'] === 'egreso').length;
  // }

  countEgresosVehiculos() {
    this.getCajaOps();
    const regex = /\begreso\b/i; // Expresión regular que busca la palabra "egreso" como una palabra completa, ignorando mayúsculas y minúsculas
    this.cantEgresosVehiculos = this.cajaOps.filter((t) => regex.test(t['concepto'])).length;
  }
  

}
