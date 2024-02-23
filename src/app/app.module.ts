import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { OcupacionComponent } from './ocupacion/ocupacion.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { HttpClientModule } from '@angular/common/http';


import { FilterPipe } from './servicios/filter.pipe';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


import { TicketEntradaComponent } from './ticket/ticket-entrada/ticket-entrada.component';
import { NgxPrintElementModule } from 'ngx-print-element';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { BtnReimpresionComponent } from './shared/botones/btn-reimpresion/btn-reimpresion.component';

import { InicioComponent } from './inicio/inicio.component';


import { environment } from '../environments/environment';

import { CustomAdapterService } from './servicios/Fechas/calendario/custom-adapter.service';
import { CustomDateParserFormatterService } from './servicios/Fechas/calendario/custom-date-parser-formatter.service';
import { NgbTimeStringAdapterService } from './servicios/Fechas/calendario/ngb-time-string-adapter.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { ScannerComponent } from './scanner/scanner.component';

// LOGS //
import { LogsComponent } from './logs/logs.component';
import { LogService } from './servicios/log.service';


import { FIREBASE_OPTIONS } from '@angular/fire/compat';

// LOGIN
import { LoginComponent } from './appLogin/login/login.component';
import { LogoutComponent } from './appLogin/logout/logout.component';
import { AuthService } from './servicios/autentificacion/auth.service';

// BOTONES
import { BtnAgregarComponent } from './shared/botones/btn-agregar/btn-agregar.component';
import { BtnEditarComponent } from './shared/botones/btn-editar/btn-editar.component';
import { BtnEliminarComponent } from './shared/botones/btn-eliminar/btn-eliminar.component';
import { ForgotPasswordComponent } from './appLogin/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './appLogin/verify-email/verify-email.component';
import { SignUpComponent } from './appLogin/sign-up/sign-up.component';
import { LoginHeaderComponent } from './appLogin/login-header/login-header.component';


import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { PerfilEmpresaComponent } from './perfil-empresa/perfil-empresa.component';
import { EmpresaFormComponent } from './perfil-empresa/empresa-form/empresa-form.component';

import { DataTablesModule } from 'angular-datatables';

import { NavbarComponent } from './home/navbar/navbar.component';
import { HeaderComponent } from './home/header/header.component';
import { AppRoutingModule } from './app-routing.module';

import { BtnConsultarComponent } from './shared/botones/btn-consultar/btn-consultar.component';

import { LimboComponent } from './limbo/limbo.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TicketHeaderComponent } from './ticket/ticket-header/ticket-header.component';
import { TicketCierreCajaComponent } from './ticket/ticket-cierre-caja/ticket-cierre-caja.component';

import { BtnShowComponent } from './shared/botones/btn-show/btn-show.component';
import { BtnIngresoComponent } from './shared/botones/btn-ingreso/btn-ingreso.component';
import { BtnEgresoComponent } from './shared/botones/btn-egreso/btn-egreso.component';
import { ContactoComponent } from './contacto/contacto.component';

import { AlumnosControlComponent } from './alumnos/alumnos-control/alumnos-control.component';
import { AlumnosFormComponent } from './alumnos/alumnos-form/alumnos-form.component';
import { AlumnosViewComponent } from './alumnos/alumnos-view/alumnos-view.component';
import { ProfesoresControlComponent } from './profesores/profesores-control/profesores-control.component';
import { ProfesoresFormComponent } from './profesores/profesores-form/profesores-form.component';
import { ProfesoresViewComponent } from './profesores/profesores-view/profesores-view.component';
import { CursosControlComponent } from './cursos/cursos-control/cursos-control.component';
import { CursosFormComponent } from './cursos/cursos-form/cursos-form.component';
import { CursosViewComponent } from './cursos/cursos-view/cursos-view.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { HorariosFormComponent } from './cursos/horarios-form/horarios-form.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OcupacionComponent,
    LoginComponent,
    HomeComponent,
    BtnAgregarComponent,
    BtnEditarComponent,
    BtnEliminarComponent,

    FilterPipe,

    PagenotfoundComponent,


    TicketEntradaComponent,
    BtnReimpresionComponent,

 

    InicioComponent,



    ScannerComponent,
    LogsComponent,


    LogoutComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    SignUpComponent,
    LoginHeaderComponent,

    PerfilUsuarioComponent,
    PerfilEmpresaComponent,
    EmpresaFormComponent,
 
    NavbarComponent,
  

    BtnConsultarComponent,

      LimboComponent,
      UsuariosComponent,
      TicketHeaderComponent,
      TicketCierreCajaComponent,

      BtnShowComponent,
      BtnIngresoComponent,
      BtnEgresoComponent,
      ContactoComponent,

      AlumnosControlComponent,
      AlumnosFormComponent,
      AlumnosViewComponent,
      ProfesoresControlComponent,
      ProfesoresFormComponent,
      ProfesoresViewComponent,
      CursosControlComponent,
      CursosFormComponent,
      CursosViewComponent,
      CalendarComponent,
      HorariosFormComponent,

  ],
  imports: [
    DayPilotModule,
    BrowserModule,
    FormsModule,
    NgxPrintElementModule,
    NgxBarcode6Module,
    AppRoutingModule,
    NgbModule, //se importa la clase RouterModule y se le indica la const donde estan las rutas
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    DataTablesModule,
  ],
  providers: [
    CustomAdapterService,
    CustomDateParserFormatterService,
    NgbTimeStringAdapterService,
    AuthService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    LogService,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
