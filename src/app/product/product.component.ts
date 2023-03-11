import { Component, OnInit } from '@angular/core';
import { RestService, Product } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];

  constructor(
    public rest: RestService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.rest.getProducts().subscribe({
      next: (resp) => {
        this.products = resp;
        console.log(this.products);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => console.info('complete')
    });
  }

  add(): void {
    this.router.navigate(['/product-add']);
  }

  delete(id: string): void {
    this.rest.deleteProduct(id).subscribe({
      next: () => {
        this.getProducts();
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => console.info('complete')
    });
  }

}
