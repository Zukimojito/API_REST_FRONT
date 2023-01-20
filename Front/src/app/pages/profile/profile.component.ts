import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = { id: 0, username: '', password: '', email: '', adresse: '', role: 0 };
  public form: FormGroup = this.fb.group({
    id: [{ value: '', disabled: true }, [Validators.required]],
    username: ['', [Validators.required]],
    password: [''],
    email: ['', [Validators.required]],
    adresse: ['', [Validators.required]],
    // block the form role field
    role: [{ value: this.user.role, disabled: true }, [Validators.required]]

  });

  public error: string = '';
  public updateInfo: any = '';

  constructor(
    private AuthService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

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

  ngOnInit(): void {
    this.AuthService.getUser().subscribe((res) => {
      this.user = res;
      this.form.patchValue({
        id: this.user.id,
        username: this.user.username,
        email: this.user.email,
        adresse: this.user.adresse,
        role: this.user.role
      });
      console.log(this.form.getRawValue());

    });
  }

  public modify() {
    this.updateInfo = '';
    this.error = '';
    // display the form getRawValue except the role field
    this.AuthService.modifyUser(this.user.id!, this.form.getRawValue()).subscribe({
      next: (res) => {
        this.showUpdateInfo(res);
      },
      error: (err) => {
        this.showErrorMessage(err);
      }
    });
  }

  public delete() {
    this.AuthService.deleteUser(this.user.id!).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/login');
        this.AuthService.userSubject.next('');
        this.showUpdateInfo(res);
      },
      error: (err) => {
        this.showErrorMessage(err);
      }
    });
  }
}

