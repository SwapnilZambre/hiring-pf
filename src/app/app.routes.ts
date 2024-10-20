import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './component/user/user-list/user-list.component';
import { authGuard } from './auth.guard';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
   redirectTo:'login',
   pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },{
    path:'',
    component:LayoutComponent,
    canActivate:[authGuard],
    children:[
      {
        path:"dashboard",
        component:DashboardComponent
      },
      {
        path:"user-list",
        component:UserListComponent,
       
      }

    ]
  }
 
];
