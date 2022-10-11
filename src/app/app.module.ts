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

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    ClientesComponent,
    AdClientesComponent,
    LogComponent,
    UsersComponent,
    RetrivePasswordComponent,
    QuotationComponent
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
    AngularFirestoreModule,
    
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
