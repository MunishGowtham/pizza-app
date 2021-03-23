import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { cartLists, pizzaList } from 'src/app/models/pizza-list';
import { SharedService } from 'src/app/service/shared.service';
import { AddOnDialogComponent } from '../pizza-listing/pizza-listing.component';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {
  cartLists: cartLists[];

  constructor(private sharedService: SharedService, public dialog: MatDialog) { }

  ngOnInit(): void {
    debugger
    this.cartLists = this.sharedService.getCartDetails();
  }
  openDialog(data): void {
    let dataList = this.sharedService.getPizzaListOfId(data.id);
    const dialogRef = this.dialog.open(AddOnDialogComponent, {
      width: '745px',
      height: '650px',
      data: { id: dataList.id, size: dataList.size, topping: dataList.toppings }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.sharedService.updateCart({ id: dataList.id, name: dataList.name, selection: result, price: dataList.price });

    });
  }

}
