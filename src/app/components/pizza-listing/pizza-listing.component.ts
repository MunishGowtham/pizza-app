import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { pizzaList } from 'src/app/models/pizza-list';
import { SharedService } from 'src/app/service/shared.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pizza-listing',
  templateUrl: './pizza-listing.component.html',
  styleUrls: ['./pizza-listing.component.scss']
})


export class PizzaListingComponent implements OnInit {
  pizzaLists: pizzaList[];
  sortCriteria = [
    { value: 'rating', viewValue: 'RATING' },
    { value: 'pricelow', viewValue: 'PRICE - LOW TO HIGH' },
    { value: 'pricehigh', viewValue: 'PRICE - HIGH TO LOW' }
  ];

  selected = '';
  isCartVisible: boolean = false;
  constructor(private sharedService: SharedService, private config: NgbRatingConfig, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPizzaLists();
    this.sharedService.isCartVisble.subscribe(value => value ? this.isCartVisible = value : '');
  }
  getPizzaLists() {
    this.sharedService.getPizzaInfo().subscribe(response => {
      if (response) {
        this.pizzaLists = response;
        this.sharedService.setPizzaList(response);
      }
    }, (err: HttpErrorResponse) => { })
  }
  triggerSelectionChange(e) {
    switch (e) {
      case 'pricehigh':
        this.pizzaLists = this.pizzaLists.sort((a, b) => (a.price < b.price) ? 1 : a.price > b.price ? -1 : 0)
        break;
      case 'pricelow':
        this.pizzaLists = this.pizzaLists.sort((a, b) => (a.price > b.price) ? 1 : a.price < b.price ? -1 : 0);
        break;
      case 'rating':
        this.pizzaLists.sort((a, b) => (a.rating < b.rating) ? 1 : a.rating > b.rating ? -1 : 0);
        break;
      default:
        this.getPizzaInitialList();
    }
  }
  openDialog(dataList: pizzaList): void {
    const dialogRef = this.dialog.open(AddOnDialogComponent, {
      width: '745px',
      height: '650px',
      data: { id: dataList.id, size: dataList.size, topping: dataList.toppings }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.sharedService.updateCart({ id: dataList.id, name: dataList.name, selection: result, price: dataList.price });

    });
  }
  toggle(e) {
    e ? this.pizzaLists = this.pizzaLists.filter(list => (list.isVeg === true)) : this.getPizzaInitialList();
  }
  getPizzaInitialList() {
    this.pizzaLists = this.sharedService.getPizzaList();
    this.selected ? this.triggerSelectionChange(this.selected) : '';
  }
}

@Component({
  selector: 'cart-addon-dialog',
  templateUrl: 'cart-addon-dialog.html',
  styleUrls: ['./cart-addon-dialog.scss']
})
export class AddOnDialogComponent {
  selectedSize: any;
  selectedtopping: any;
  constructor(
    public dialogRef: MatDialogRef<AddOnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    document.querySelector('body').scrollTop = 300;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick() {
    let selectedToppingValue = (this.data.topping[0].isRadio) ? this.selectedtopping.name : this.filterToppings();;
    let result = {
      selectedSize: this.selectedSize.size,
      toppingType: this.data.topping[0].isRadio,
      selectedTopping: selectedToppingValue
    }
    this.dialogRef.close(result);
  }
  filterToppings() {
    let response = this.data.topping[0].items.filter(item => (item.checked == true));
    if (response)
      return response.map(item => item.name).join(', ');
    else return []
  }
}