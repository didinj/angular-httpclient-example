import { Component, OnInit } from '@angular/core';
import { RestService } from './rest.service';
import { Smartphone } from './smartphone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-httpclient';
  // smartphone: any[] = [];
  smartphone: Smartphone[] = [];
  headers: any;
  spresp: any;
  postdata: Smartphone | undefined;

  constructor(private api: RestService) {}

  // getSmartphones() {
  //   this.api.getSmartphone()
  //     .subscribe(data => {
  //       for (const d of (data as any)) {
  //         this.smartphone.push({
  //           name: d.name,
  //           price: d.price
  //         });
  //       }
  //       console.log(this.smartphone);
  //     });
  // }

  getSmartphones() {
    this.api.getSmartphone()
    .subscribe(resp => {
      console.log(resp);
      const keys = resp.headers.keys();
      this.headers = keys.map((key: any) =>
        `${key}: ${resp.headers.get(key)}`);
  
      for (const data of resp.body!) {
        this.smartphone.push(data);
      }
      console.log(this.smartphone);
    });
  }

  getSmartphoneById(id: any) {
    this.api.getSmartphoneById(id)
      .subscribe(data => {
        console.log(data);
      });
  }
}
