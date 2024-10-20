import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const isLogin=localStorage.getItem("isLogin");
  const routes= inject(Router)
  if(isLogin){
    return true
  }
  routes.navigate(['login'])
  return false;
};
