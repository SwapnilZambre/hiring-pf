import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../model/model.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
email:string='sdjfs@gmial.com'
pass:string="1234@sd"
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _userService: UserServiceService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  ngOnInit(): void {}

  logIn() {
    if (this.loginForm.valid) {
      localStorage.setItem('userData', JSON.stringify(this.loginForm.value));
      this._userService.getUser().subscribe({
        next: (user: any) => {
          localStorage.setItem('isLogin', 'true');
          const userData = localStorage.getItem('userData');
          if (userData) {
            const loggedInUser = JSON.parse(userData);
            const matchedUser = user?.find(
              (user: User) =>
                user?.email === loggedInUser?.email &&
                user?.password === loggedInUser?.password
            );

            if (matchedUser) {
              localStorage.setItem('userRole', matchedUser.role);
              this._userService.setUserList(user)
              this.router.navigate(['/dashboard']);
            } else {
              alert('Please enter a valid user');
            }
          } else {
            alert('No user data found');
          }
        },
        error: (err) => {
          console.error('Error fetching user data', err);
        },
      });
    }
  }
}
