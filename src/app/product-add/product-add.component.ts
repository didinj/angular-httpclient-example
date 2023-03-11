import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  @Input() productData = { prod_name: '', prod_desc: '', prod_price: 0 };

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // init here
  }

  addProduct(): void {
    this.rest.addProduct(this.productData).subscribe({
      next: (result) => {
        this.router.navigate(['/product-details/' + result._id]);
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }

}