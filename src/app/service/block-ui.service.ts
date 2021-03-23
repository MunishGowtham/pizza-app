import { Injectable } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable({
  providedIn: 'root'
})
export class BlockUIService {
  @BlockUI() blockUI: NgBlockUI;
  private BlockUICount = 0;
  BlockUIAngular() {
    this.blockUI.start('Loading...');
  }
  UnBlockUIAngular() {
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
    }, 900);
  }
  pushBlockUI(serviceName: string) {
    let pushCount: number = this.BlockUICount;
    ++pushCount;
    this.BlockUICount = pushCount;
    this.BlockUIAngular();
  }
  popBlockUI(serviceName: string) {
    let popCount: number = this.BlockUICount;
    while (popCount > 0) {
      if (popCount >= 0) {
        popCount = popCount - 1;
      } else {
        popCount = 0;
      }
    }
    this.UnBlockUIAngular();
  }
}
