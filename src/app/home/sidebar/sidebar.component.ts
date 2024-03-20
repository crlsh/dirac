import { Component, OnInit } from '@angular/core';
import {ROUTES} from '../routes';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  isParent?:boolean;
}




@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[];
  isDashboardOpen: boolean = false;
  dashboardItems: RouteInfo[] = [];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(item => !item.isParent);
    // Filtrar las rutas que van en el submenu
    this.dashboardItems = ROUTES.filter(item => item.isParent);
  }

  toggleDashboard() {
    this.isDashboardOpen = !this.isDashboardOpen;
  }
}

