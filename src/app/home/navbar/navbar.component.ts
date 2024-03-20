import { StorageService } from 'src/app/servicios/storage/storage.service';
import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ROUTES } from '../routes';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user$!: any;

  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton: any;
  private sidebarVisible: boolean;

  public isCollapsed = true;
  @ViewChild('navbar-cmp', { static: false }) button: any;

  ngOnInit(): void {
    this.user$ = this.storageService.usuario$;
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    var navbar : HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
   });
}

  constructor(
    private storageService: StorageService,
    location: Location,
    private renderer: Renderer2,
    private element: ElementRef,
    private router: Router
  ) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  getTitle() {
    // Obtener la ruta actual de Angular
    const currentPath = this.location.path();
    console.log('Current path:', currentPath); // Verificar la ruta actual
  
    // Buscar la ruta coincidente en las rutas definidas
    const matchedRoute = this.listTitles.find(route => currentPath.includes(route.path.replace('./', '')));
  
    console.log('Matched route:', matchedRoute); // Verificar la ruta coincidente
  
    // Devolver el título de la ruta coincidente o "Dashboard" si no se encuentra ninguna coincidencia
    return matchedRoute ? matchedRoute.title : 'Dashboard';
  }
  
  
  
  
  
  sidebarToggle() {
      if (this.sidebarVisible === false) {
          this.sidebarOpen();
      } else {
          this.sidebarClose();
      }
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);

        html.classList.add('nav-open');
        if (window.innerWidth < 991) {
          mainPanel.style.position = 'fixed';
        }
        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
        if (window.innerWidth < 991) {
          setTimeout(function(){
            mainPanel.style.position = '';
          }, 500);
        }
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    collapse(){
      this.isCollapsed = !this.isCollapsed;
      const navbar = document.getElementsByTagName('nav')[0];
      console.log(navbar);
      if (!this.isCollapsed) {
        navbar.classList.remove('navbar-transparent');
        navbar.classList.add('bg-white');
      }else{
        navbar.classList.add('navbar-transparent');
        navbar.classList.remove('bg-white');
      }

    }


}
