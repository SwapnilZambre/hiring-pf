import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../service/user-service.service';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../model/model.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-common-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './common-dialog.component.html',
  styleUrl: './common-dialog.component.scss'
})
export class CommonDialogComponent {
  userForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private _userService: UserServiceService,
    private dialog: MatDialog,
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      this._userService.addUser(user).subscribe({
        next: (data) => {
          console.log(data, 'data added');
          this.userForm.reset();
        },
        error: (err) => {
          console.error('Error adding user:', err);
        }
      });
    }
  }
}
