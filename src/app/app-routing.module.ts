import { NgModule } from '@angular/core';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './appLogin/forgot-password/forgot-password.component';
import { LoginComponent } from './appLogin/login/login.component';
import { SignUpComponent } from './appLogin/sign-up/sign-up.component';
import { VerifyEmailComponent } from './appLogin/verify-email/verify-email.component';

import { AlumnosControlComponent } from './features/alumnos/alumnos-control/alumnos-control.component';

import { IsSuperAdminGuard } from './guards/is-super-admin.guard';
import { HomeComponent } from './home/home.component';
import { LimboComponent } from './core/limbo/limbo.component';
import { LogsComponent } from './core/logs/logs.component';

import { PerfilEmpresaComponent } from './core/perfil-empresa/perfil-empresa.component';
import { PerfilUsuarioComponent } from './core/perfil-usuario/perfil-usuario.component';

import { UsuariosComponent } from './core/usuarios/usuarios.component';

import { ContactoComponent } from './core/contacto/contacto.component';
import { ProfesoresControlComponent } from './features/profesores/profesores-control/profesores-control.component';
import { CursosControlComponent } from './features/cursos/cursos-control/cursos-control.component';
import { CalendarComponent } from './features/calendar/calendar.component';

// const routes: Routes = [];

//se crea una const del tipo Routes para guardar todas las rutas
//esto importa la clase Routes
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(redirectUnauthorizedToLogin),
    children: [
      {
        path: '',
        redirectTo: 'calendario',
        pathMatch: 'full',
      },

      {
        path: 'calendario',
        component: CalendarComponent,
        ...canActivate(redirectUnauthorizedToLogin),
      },

      {
        path: 'alumnos',
        component: AlumnosControlComponent,
        ...canActivate(redirectUnauthorizedToLogin),
      },

      {
        path: 'profesores',
        component: ProfesoresControlComponent,
        ...canActivate(redirectUnauthorizedToLogin),
      },

      {
        path: 'cursos',
        component: CursosControlComponent,
        ...canActivate(redirectUnauthorizedToLogin),
      },

      {
        path: 'logs',
        component: LogsComponent,
        ...canActivate(redirectUnauthorizedToLogin),
      },
      {
        path: 'usuario',
        component: PerfilUsuarioComponent,
        ...canActivate(redirectUnauthorizedToLogin),
      },
      {
        path: 'empresa',
        component: PerfilEmpresaComponent,
        ...canActivate(redirectUnauthorizedToLogin),
      },

      {
        path: 'usuarios',
        component: UsuariosComponent,
        ...canActivate(redirectUnauthorizedToLogin),
        canActivate: [IsSuperAdminGuard],
      },
      {
        path: 'contacto',
        component: ContactoComponent,
        ...canActivate(redirectUnauthorizedToLogin), // Agregar el canActivate guard
      },
    ],
  },
  { path: 'limbo', component: LimboComponent }, // la ruta al login
  { path: 'login', component: LoginComponent }, // la ruta al login
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'register-user', component: SignUpComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
