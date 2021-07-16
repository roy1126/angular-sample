import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })

/* This AuthGuard protects to navigate from a certain page when no user is logged in! */
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      /* Just take the latest user and subscribe only once then unsubscribe */
      take(1),
      map((user) => {
       const isAuth = !!user;
       if(isAuth){
         return true;
       }
       /* Navigate to auth when trying to go in recipes page */
       return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
