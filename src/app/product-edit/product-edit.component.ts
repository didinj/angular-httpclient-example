import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  @Input() productData: any = { prod_name: '', prod_desc: '', prod_price: 0 };

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.rest.getProduct(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.productData = data;
    });
  }

  updateProduct(): void {
    this.rest.updateProduct(this.route.snapshot.params['id'], this.productData).subscribe({
      next: (result) => {
        this.router.navigate(['/product-details/' + result._id]);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => console.info('complete')
    });
  }

}