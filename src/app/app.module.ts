import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullComponent } from './layouts/full/full.component';
import { DemoFlexyModule } from './demo-flexy-module'

//para conectar a firebase
import { environment } from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


// Modules
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentsModule } from './components/components.module';
import { ClientesComponent } from './page/clientes/clientes.component';
import { AdClientesComponent } from './page/ad-clientes/ad-clientes.component';
import { LogComponent } from './login/log/log.component';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './page/users/users.component';
import { RetrivePasswordComponent } from './page/retrive-password/retrive-password.component';
import { QuotationComponent } from './page/quotation/quotation.component';
//import { from } from 'rxjs';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';

import { provideAuth,getAuth } from '@angular/fire/auth';

import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ValidationRolComponent } from './page/validation-rol/validation-rol.component';
import { VehicleComponent } from './page/vehicle/vehicle.component';
import { AddVehicleComponent } from './page/add-vehicle/add-vehicle.component';
import { ReporteCapitalComponent } from './page/reporte-capital/reporte-capital.component';
import { ReportesComponent } from './page/reportes/reportes.component';
import { ProximosPagarComponent } from './page/proximos-pagar/proximos-pagar.component';






@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    ClientesComponent,
    AdClientesComponent,
    LogComponent,
    UsersComponent,
    RetrivePasswordComponent,
    QuotationComponent,
    ValidationRolComponent,
    VehicleComponent,
    AddVehicleComponent,
    ReporteCapitalComponent,
    ReportesComponent,
    ProximosPagarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DashboardModule,
    ComponentsModule,
    FormsModule,
     //ComponentsModule,
    CommonModule,
     //para conectar a firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    AngularFirestoreModule,
    //provideStorage(()=>getStorage()),
    ReactiveFormsModule,
    provideAuth(() => getAuth()),

    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
