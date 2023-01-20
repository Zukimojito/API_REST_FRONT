import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  montant: any = { id: 0, montant: 0, userID: 0, created_at: '', updated_at: '' };

  constructor(
    private router: Router,
    private AuthService: AuthService
  ) { }

  ngOnInit(): void {

    this.AuthService.getUser().subscribe((res) => {
      this.AuthService.readMoney(res.id).subscribe((res) => {
        this.montant = res;
        console.log(this.montant);
      });
    });

    // this.AuthService.readMoney()
  }

}

