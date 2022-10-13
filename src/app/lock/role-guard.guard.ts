import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuth(route);
  }

  private isAuth(route: ActivatedRouteSnapshot):boolean{
    const roles = ['gerencia']; //dinamico
    const expectedRoles = route.data['expectedRoles'];
    const rolematchs = roles.findIndex(role => expectedRoles.indexOf(role)!== -1);
    return (rolematchs < 0) ? false : true;
  }
  
}
