import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private router: Router){}
  canActivate(): boolean{
    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/login']);
      return false
    }
    return true;
  }
}
