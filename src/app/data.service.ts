import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})

// Base de datos "en el server"
export class DataService implements InMemoryDbService {
  createDb() {
    return { 
    vehiculos : [
      {
        id: 1,
        patente: "AG 759 LH",
        marca:"Ford",
        modelo:"Sierra",
        color:"blanco",
        ingreso:"00",
        egreso: "00"
      },
      {
        id: 2,
        patente: "AX 512 LH",
        marca:"Renault",
        modelo:"Fuego",
        color:"rojo",
        ingreso:"00",
        egreso: "00",
      },
      {
        id: 3,
        patente: "UV 349 LH",
        marca:"Fiat",
        modelo:"128",
        color:"gris",
        ingreso:"00",
        egreso: "00"
      },
    ],

    tarifas : [
        {
          id: 1,
          nombre:"auto",
          unidad_tiempo:"hora",
          valor:250,
          fraccion:"15",
          ut_fraccion:"minutos",
          descuento:"no"
        },
        {
          id: 2,
          nombre:"mensual",
          unidad_tiempo:"mes",
          valor:7000,
          fraccion:"no",
          ut_fraccion:"no",
          descuento:"no"
        },
        {
          id: 3,
          nombre:"moto-estadia",
          unidad_tiempo:"dia",
          valor:1500,
          fraccion:"no",
          ut_fraccion:"no",
          descuento:"no"
        },     
    ] ,
    

    clientes : [
      { id: 1,
        nombre:"Jorgelina Sanjuanina",
        telefono:"4444-5555",
        direccion:"alameda 2345",
        comentario:"polo rojo patente 2343323434",
      
    },     

    { id: 2,
      nombre:"Homero thompson",
      telefono:"4444-5335",
      direccion:"siempreviva 4534",
      comentario:"homero movil patente 2343323434",
    
  },   
  ] };

  }

}