import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authServices: AuthService,
               private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

      return this.authServices.verificaAutenticacion()
          .pipe(
            tap( estaAutenticado => {
               if(!estaAutenticado) {
                this.router.navigate(['./auth/login']);
               }
            })
          )
     /* if ( this.authServices.auth.id ) {
          return true;
      }
     console.log ('bloqueado por el authguarda can activate')
    return false; */

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean>  | boolean{

      console.log ('cannload')
      return this.authServices.verificaAutenticacion()
          .pipe(
            tap( estaAutenticado => {
              if(!estaAutenticado) {
                this.router.navigate(['./auth/login']);
              }
            })
          )

      /* if ( this.authServices.auth.id ) {
          return true;
      }
      console.log ('bloqueado por el authguarda canload')
      return false; */

  }
}
