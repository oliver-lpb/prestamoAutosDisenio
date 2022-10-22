import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { userAdminModel } from '../models/adminUser.model';
import { DatosService } from '../services/data.service';
import userLock from '../utils/userLock.inteface';


@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuth(route);
  }
  
  user:userLock[];
  usersDos:userAdminModel[]=[];

  constructor(private data:DatosService){
    this.user = [{
      nombre:'',
      rol:'',
      correo:'',
      password:'',
    }];
  }
  rol='';
  correo:any;

  private isAuth(route: ActivatedRouteSnapshot):boolean{

    this.correo = localStorage.getItem('correo');
    this.rol='';
    this.data.getUsersLockDos(this.correo).subscribe(doc=>{
      this.usersDos=[];
      doc.forEach((element:any)=>{
        this.usersDos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      
      console.log('esto es de patyrol',this.usersDos[0].rol);
      this.rol=this.usersDos[0].rol;
    })

    //const roles = [rol]; //dinamico
    const roles = ['gerencia'];
    const expectedRoles = route.data['expectedRoles'];
    const rolematchs = roles.findIndex(role => expectedRoles.indexOf(role)!== -1);
    return (rolematchs < 0) ? false : true;
  }
  
}
