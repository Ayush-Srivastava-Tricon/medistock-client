import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    

      let isUserLoggedIn:boolean = JSON.parse(<any>sessionStorage.getItem("isLoggedIn"));

      if(isUserLoggedIn){
        return true;
      }
      else{
        this.router.navigate(['']);
        return false;
      }

    }
  
}
