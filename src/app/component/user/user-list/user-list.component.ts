import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserServiceService } from '../../../service/user-service.service';
import { RouterOutlet } from '@angular/router';
import { User } from '../../../model/model.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonDialogComponent } from '../../../common-dialog/common-dialog.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, MatDialogModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'], // Fixed property name to styleUrls
})
export class UserListComponent implements OnInit {
  userForm: FormGroup;
  userList: any[] = [];
  
  constructor(
    private fb: FormBuilder,
    private _userService: UserServiceService,
    private dialog: MatDialog,
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  
  ngOnInit() {
    this.getUserList();
  }
  
  getUser() {
    this._userService.getUser().subscribe({
      next: (user) => {
        console.log('User data received:', user);
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      },
    });
  }
  
  getUserList() {
    debugger
    this._userService.getUser().subscribe({
      next: (userList:any) => {
        this.userList = userList;
      },
      error: () => {
        alert('No User Data Found');
      },
    });
  }
  
  addUser() {
    this.dialog.open(CommonDialogComponent, {
      width: '500px',
      height: '500px',
    });
  }
}
