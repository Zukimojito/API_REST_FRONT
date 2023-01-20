import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  public error: string = '';

  constructor(private router: Router, private fb: FormBuilder, private AuthService: AuthService) { }

  ngOnInit() {
  }

  public submit() {
    if (this.form.valid) {
      this.AuthService.login(this.form.getRawValue()).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.toString());
          this.router.navigateByUrl('/profile');
        }, error: (err) => {
          this.error = err?.error || "Username or password is incorrect";
        }
      });
    }
    console.log(this.form.getRawValue());
  }

}



