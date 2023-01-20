import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.css'],
  entryComponents: [ModalErrorComponent]
})
export class ModalErrorComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialog.closeAll();
  }

  connect() {
    this.router.navigate(['/login']);
    this.dialog.closeAll();
  }

}

