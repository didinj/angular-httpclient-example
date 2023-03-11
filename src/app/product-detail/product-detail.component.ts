import { Component, OnInit } from '@angular/core';
import { RestService, Product } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product | undefined;

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.rest.getProduct(this.route.snapshot.params['id']).subscribe(
      (data: Product) => this.product = { ...data }
    );
  }

}