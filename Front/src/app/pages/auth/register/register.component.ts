import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    adresse: ['', [Validators.required]],
  });

  public error: string = '';

  constructor(private router: Router, private fb: FormBuilder, private AuthService: AuthService) { }

  ngOnInit() {
  }

  public submit() {

    if (this.form.valid) {
      this.AuthService.register(this.form.getRawValue()).subscribe({
        next: (res) => {
          this.router.navigateByUrl('/login');
        }, error: (err) => {
          this.error = err?.error || "Something went wrong";
        }
      });

      // this.AuthService.createMoney(this.form.getRawValue()).subscribe({
      //   next: (res) => {
      //     this.router.navigateByUrl('/login');
      //   }, error: (err) => {
      //     this.error = err?.error || "Something went wrong";
      //   }
      // });
    }
  }
}