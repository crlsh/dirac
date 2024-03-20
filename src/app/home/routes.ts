export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    isParent?:boolean;
  }
  
  export const ROUTES: RouteInfo[] = [
    { path: './calendario', title: 'Calendario', icon: 'fa fa-calculator', class: '', isParent: false },
    { path: './cursos', title: 'Cursos', icon: 'fa fa-calculator', class: '', isParent: false },
    { path: './profesores', title: 'Profesores', icon: 'fa fa-calculator', class: '', isParent: false },
    { path: './alumnos', title: 'Alumnos', icon: 'fa fa-book', class: '', isParent: false },
    { path: './usuario', title: 'Perfil Usuario', icon: 'fa fa-user', class: '', isParent: true },
    { path: './empresa', title: 'Perfil Empresa', icon: 'fa fa-building', class: '', isParent: true },
    { path: './usuarios', title: 'Usuarios', icon: 'fa fa-users', class: '', isParent: true },
    { path: './logs', title: 'Logs', icon: 'fa fa-file-alt', class: '', isParent: true }
  ];