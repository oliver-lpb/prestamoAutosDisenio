import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AutenticacionService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {

  local:boolean=false;
  search: boolean = false;
  recuperar:boolean=false;
  login:boolean=true


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,  private autenticacion:AutenticacionService, private router:Router) { }
  
  retrive(){
    this.recuperar=false;
    this.login=true;
  }

  initUser(){
    this.recuperar=false;
    this.login=false;
    this.local=true;
    
  }

  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/casa",
      icon: "home",
      menu: "Dashboard",
    },
    {
      link: "/clientesVersionDos",
      icon: "file-text",
      menu: "Clientes",
    },
    
    {
      link: "/vehiculos",
      icon: "file-text",
      menu: "Vehiculos",
    },
    {
      link: "/cotizacion",
      icon: "divide-circle",
      menu: "Cotizacion",
    },
    {
      link: "/users",
      icon: "disc",
      menu: "Usuarios",
    },
    
    {
      link: "/pagos",
      icon: "layers",
      menu: "Pagos",
    },

    /**
     * 
     * 
    
    {
      link: "/forms",
      icon: "layout",
      menu: "Forms",
    },
    {
      link: "/alerts",
      icon: "info",
      menu: "Alerts",
    },
    {
      link: "/grid-list",
      icon: "file-text",
      menu: "Grid List",
    },
    {
      link: "/menu",
      icon: "menu",
      menu: "Menus",
    },
    {
      link: "/table",
      icon: "grid",
      menu: "Tables",
    },
    {
      link: "/expansion",
      icon: "divide-circle",
      menu: "Expansion Panel",
    },
    {
      link: "/chips",
      icon: "award",
      menu: "Chips",
    },
    {
      link: "/tabs",
      icon: "list",
      menu: "Tabs",
    },
    {
      link: "/progress",
      icon: "bar-chart-2",
      menu: "Progress Bar",
    },
    {
      link: "/toolbar",
      icon: "voicemail",
      menu: "Toolbar",
    },
    {
      link: "/progress-snipper",
      icon: "loader",
      menu: "Progress Snipper",
    },
    {
      link: "/tooltip",
      icon: "bell",
      menu: "Tooltip",
    },
    {
      link: "/snackbar",
      icon: "slack",
      menu: "Snackbar",
    },
    {
      link: "/slider",
      icon: "sliders",
      menu: "Slider",
    },
    {
      link: "/slide-toggle",
      icon: "layers",
      menu: "Slide Toggle",
    },
    */
  ]

  logOut(){
    this.autenticacion.logOut();
    this.router.navigate(['/signIn']);
    localStorage.removeItem('id');
    localStorage.removeItem('correo');
  }
}
