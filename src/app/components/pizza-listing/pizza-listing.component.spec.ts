import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaListingComponent } from './pizza-listing.component';

describe('PizzaListingComponent', () => {
  let component: PizzaListingComponent;
  let fixture: ComponentFixture<PizzaListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzaListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
