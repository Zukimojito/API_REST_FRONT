import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Front';
  public user$: Observable<string | null> = this.AuthService.userSubject.asObservable();

  constructor(private AuthService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.user$);
  }

  public logout() {
    this.AuthService.logout().subscribe({
      next: (msg) => {
        console.log(msg);
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
      }
    })
  }
}
