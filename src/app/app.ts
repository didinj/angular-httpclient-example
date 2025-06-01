import { Component, OnInit } from '@angular/core';
import { RestApiService } from './services/rest-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  products: any[] = [];
  product = { name: '', price: 0 };
  selectedProductId: string | null = null;
  searchQuery = '';

  constructor(private api: RestApiService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.api.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  saveProduct() {
    if (this.selectedProductId) {
      this.api.updateProduct(this.selectedProductId, this.product).subscribe(() => {
        this.resetForm();
        this.loadProducts();
      });
    } else {
      this.api.addProduct(this.product).subscribe(() => {
        this.resetForm();
        this.loadProducts();
      });
    }
  }

  editProduct(product: any) {
    this.product = { name: product.name, price: product.price };
    this.selectedProductId = product._id;
  }

  deleteProduct(id: string) {
    this.api.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  resetForm() {
    this.product = { name: '', price: 0 };
    this.selectedProductId = null;
  }

  search() {
    this.api.searchProducts(this.searchQuery).subscribe(data => {
      this.products = data;
    });
  }
}
