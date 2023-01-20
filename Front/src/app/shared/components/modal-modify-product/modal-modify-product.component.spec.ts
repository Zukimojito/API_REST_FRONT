import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModifyProductComponent } from './modal-modify-product.component';

describe('ModalModifyProductComponent', () => {
  let component: ModalModifyProductComponent;
  let fixture: ComponentFixture<ModalModifyProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalModifyProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalModifyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
