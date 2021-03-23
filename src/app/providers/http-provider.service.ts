import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlockUIService } from '../service/block-ui.service';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpProvider {
  constructor(public http: HttpClient, private blockUIService: BlockUIService) {
  }
  get(url: string) {
    this.blockUIService.BlockUIAngular();
    return this.http.get(url)
      .pipe(
        tap(response => {
          this.blockUIService.UnBlockUIAngular();
          return response;
        },
          error => {
            this.blockUIService.UnBlockUIAngular();
          }
        ));
  }
}
