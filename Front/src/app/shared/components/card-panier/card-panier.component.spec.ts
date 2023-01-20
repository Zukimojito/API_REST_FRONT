import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPanierComponent } from './card-panier.component';

describe('CardPanierComponent', () => {
  let component: CardPanierComponent;
  let fixture: ComponentFixture<CardPanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPanierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
