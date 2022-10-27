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
  rol:string='';
  correo:any;

  constructor(private data:DatosService){
    this.user = [{
      nombre:'',
      rol:'',
      correo:'',
      password:'',
    }];
  }


  private isAuth(route: ActivatedRouteSnapshot):boolean{

    this.correo = localStorage.getItem('correo');

    this.data.getUsersLockDos(this.correo).subscribe(doc=>{
      this.user=[];
      doc.forEach((element:any)=>{
        this.user.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
        console.log('esto es de patyrol paso uno',this.user[0].rol);
        this.rol=this.user[0].rol;
        console.log('esto es de this rol paso dos',this.rol)
      });


    })
    
      console.log('esto es de patyrol pas o3',this.rol);
      //const roles = [this.rol]; //dinamico
      console.log('esto es de patyrol pas o4',this.rol);
      const roles = ['gerencia'];
      const expectedRoles = route.data['expectedRoles'];
      const rolematchs = roles.findIndex(role => expectedRoles.indexOf(role)!== -1);
      return (rolematchs < 0) ? false : true;

  }
  
}
