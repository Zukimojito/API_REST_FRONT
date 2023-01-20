import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-all.users',
  templateUrl: './all.users.component.html',
  styleUrls: ['./all.users.component.css']
})
export class AllUsersComponent implements OnInit {
  user: User[] = [];
  editing: number = -1;
  saving: boolean = false;
  error: string = '';
  updateInfo: any = '';

  public form: FormGroup = this.fb.group({
    id: [{ value: '', disabled: true }, [Validators.required]],
    username: ['', [Validators.required]],
    password: [''],
    email: ['', [Validators.required]],
    adresse: ['', [Validators.required]],
    role: [{ value: '', disabled: true }, [Validators.required]]
  });

  constructor(
    private router: Router,
    private AuthService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.AuthService.readUsers().subscribe((users: User[]) => {
      console.log(users);

      this.user = users;
    });
  }

  showUpdateInfo(message: any) {
    this.updateInfo = message;
    setTimeout(() => {
      this.updateInfo = '';
    }, 3000);
  }

  showErrorMessage(message: any) {
    this.error = message?.error || "Something went wrong";
    setTimeout(() => {
      this.error = '';
    }, 3000);

  }

  onChange() {

    let user = this.user[this.editing];
    let formValues = {
      id: user.id,
      username: user.username,
      email: user.email,
      adresse: user.adresse,
      role: user.role
    };
    this.form.patchValue(formValues);
  }

  onSubmit() {
    console.log(this.form.getRawValue());

    this.AuthService.modifyUser(this.form.getRawValue().id, this.form.getRawValue()).subscribe({
      next: (res) => {
        this.ngOnInit(); // update the page
        this.showUpdateInfo(res);
      },
      error: (err) => {
        this.showErrorMessage(err);
      }
    });
  }

  onDelete(id: any) {
    console.log(id);

    this.AuthService.deleteUser(id).subscribe({
      next: (res) => {
        this.ngOnInit(); // update the page
        this.showUpdateInfo(res);
      },
      error: (err) => {
        this.showErrorMessage(err);
      }
    });
  }

}
