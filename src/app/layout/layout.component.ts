import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { roles } from '../model/model.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  menus: any[] = [];
  role: string = '';
  isMenuHidden = false; 
  filteredMenu: any[] = [];
  constructor(private router: Router) {
    this.menus = roles.Menus;
    this.getMenus();
  }
  getMenus() {
    const userRole = localStorage.getItem('userRole');
    if (userRole != null || userRole != undefined) {
      this.role = userRole;
    }
    this.menus.forEach((element) => {
      const isRolePresent = element.roles.find(
        (role: any) => role === this.role
      );
      if (isRolePresent != undefined) {
        this.filteredMenu.push(element);
      }
    });
  }


  toggleMenu() {
    this.isMenuHidden = !this.isMenuHidden; // Toggle the boolean value
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }


}
