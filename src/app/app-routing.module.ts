import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { FormsComponent } from './components/forms/forms.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProgressSnipperComponent } from './components/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { ProductComponent } from './dashboard/dashboard-components/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';

//impotaciones propias
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { map } from 'rxjs/operators';

import { LogComponent } from './login/log/log.component';
import { AdClientesComponent } from './page/ad-clientes/ad-clientes.component';
import { ClientesComponent } from './page/clientes/clientes.component';
import { UsersComponent } from './page/users/users.component';
import { RetrivePasswordComponent } from './page/retrive-password/retrive-password.component';
import { QuotationComponent } from './page/quotation/quotation.component';
import { RoleGuardGuard } from './lock/role-guard.guard';
import { ValidationRolComponent } from './page/validation-rol/validation-rol.component';
import { VehicleComponent } from './page/vehicle/vehicle.component';
import { AddVehicleComponent } from './page/add-vehicle/add-vehicle.component';
import { ReporteCapitalComponent } from './page/reporte-capital/reporte-capital.component';
import { ReportesComponent } from './page/reportes/reportes.component';
import { ProximosPagarComponent } from './page/proximos-pagar/proximos-pagar.component';
import { PagosComponent } from './page/pagos/pagos.component';


const uIdAdmin = 'rCNEiGvcAjh4jg90m79T2Jr24Av2';
const onlyAdmnin = () => map((user:any) => {
  !!user && user.uid === user.uIdAdmin
  console.log('este es el id',user.uid)
});


const routes: Routes = [
  {
    path:"",
    component:FullComponent,
    children: [
      {path:"", redirectTo:"/login", pathMatch:"full"},

      {path:"home", component:DashboardComponent,
      canActivate: [AngularFireAuthGuard, RoleGuardGuard],
      data:{
        expectedRoles:['gerencia', 'secretaria', 'ventas']
      }
      },
      {path:"alerts", component:AlertsComponent},
      {path:"forms", component:FormsComponent},
      {path:"table", component:ProductComponent},
      {path:"grid-list", component:GridListComponent},
      {path:"menu", component:MenuComponent},
      {path:"tabs", component:TabsComponent},
      {path:"expansion", component:ExpansionComponent},
      {path:"chips", component:ChipsComponent},
      {path:"progress", component:ProgressComponent},
      {path:"toolbar", component:ToolbarComponent},
      {path:"progress-snipper", component:ProgressSnipperComponent},
      {path:"snackbar", component:SnackbarComponent},
      {path:"slider", component:SliderComponent},
      {path:"slide-toggle", component:SlideToggleComponent},
      {path:"tooltip", component:TooltipsComponent},
      {path:"button", component:ButtonsComponent},

      //extras

    {path: 'casa',component:ReportesComponent,
    canActivate: [AngularFireAuthGuard, RoleGuardGuard],
    data:{
      expectedRoles:['gerencia', 'secretaria', 'ventas']
    }
      },

    {path:"clientesVersionDos", component:ClientesComponent, 
    canActivate: [AngularFireAuthGuard, RoleGuardGuard],
    data:{
      expectedRoles:['gerencia', 'secretaria', 'ventas']
    }
    },

    {
      path: 'addCliente',component:AdClientesComponent,
      canActivate: [AngularFireAuthGuard, RoleGuardGuard],
      data:{
        expectedRoles:['gerencia', 'secretaria']
      }
    },

    {
      path: 'editCliente/:id',component:AdClientesComponent,
      canActivate: [AngularFireAuthGuard, RoleGuardGuard],
      data:{
        expectedRoles:['gerencia', 'secretaria', 'ventas']
      }
    },

    {
      path: 'editVehiculo/:id',component:AddVehicleComponent,
      canActivate: [AngularFireAuthGuard, RoleGuardGuard],
      data:{
        expectedRoles:['gerencia', 'secretaria', 'ventas']
      }
    },

    {
      path: 'users',component:UsersComponent,
      canActivate: [AngularFireAuthGuard, RoleGuardGuard],
      data:{
        expectedRoles:['gerencia']
      }
      
    },

    {
      path: 'vehiculos',component:VehicleComponent,
      canActivate: [AngularFireAuthGuard, RoleGuardGuard],
      data:{
        expectedRoles:['gerencia', 'secretaria', 'ventas']
      }
    },
    {
      path: 'addVehiculos',component:AddVehicleComponent,
      canActivate: [AngularFireAuthGuard, RoleGuardGuard],
      data:{
        expectedRoles:['gerencia', 'secretaria', 'ventas']
      }
    },
    {
      path: 'addVehiculos/:id',component:AddVehicleComponent,
      canActivate: [AngularFireAuthGuard, RoleGuardGuard],
      data:{
        expectedRoles:['gerencia', 'secretaria', 'ventas']
      }
    },

    {
      path: 'cotizacion',component:QuotationComponent,
      canActivate: [AngularFireAuthGuard, RoleGuardGuard],
      data:{
        expectedRoles:['gerencia', 'secretaria', 'ventas']
      }
    },

    {
      path: 'valid',component:ValidationRolComponent
    },
    //vehiculos

    {
      path: 'reportes',component:ReportesComponent,
      canActivate: [AngularFireAuthGuard, RoleGuardGuard],
      data:{
        expectedRoles:['gerencia', 'secretaria']
      }
    },

    {
      path: 'pagos',component:PagosComponent ,
      canActivate: [AngularFireAuthGuard, RoleGuardGuard],
      data:{
        expectedRoles:['gerencia', 'secretaria']
      }
    },
    
    
    {path:"recuperar", component:RetrivePasswordComponent, 
      
    },

      {path:"login", component:LogComponent, 
      
    },
      
    ]
  },

  {path:"", redirectTo:"/login", pathMatch:"full"},
  {path:"**", redirectTo:"/login", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
