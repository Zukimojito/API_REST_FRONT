import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalErrorComponent } from 'src/app/shared/components/modal-error/modal-error.component';
import { User } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images = [
    {
      url: '../../../assets/sidebar1.jpg',
      altText: 'Plateau de fromages des fêtes',
    },
    {
      url: '../../../assets/sidebar2.jpg',
      altText: 'Bûche façon marquise au chocolat',
    }
  ];
  constructor(
    private AuthService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  public user$: Observable<string | null> = this.AuthService.userSubject.asObservable();
  public CheckUser: string | null = '';

  ngOnInit(): void {
    this.user$.subscribe((res) => {
      if (res) {
        this.CheckUser = res;
      } else {
        this.CheckUser = '';
      }
    });
  }

  ToRef() {
    if (this.CheckUser) {
      this.router.navigateByUrl('/product');
    } else {
      this.dialog.open(ModalErrorComponent);
    }
  }

}

