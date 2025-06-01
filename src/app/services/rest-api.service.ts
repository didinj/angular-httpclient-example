import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token-goes-here'
  })
};

const params = new HttpParams()
  .set('category', 'electronics')
  .set('limit', '10');

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private apiURL = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    const headers = new HttpHeaders({
      'Custom-Header': 'MyHeaderValue'
    });

    return this.http.get(this.apiURL, { headers });
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(`${this.apiURL}/${id}`);
  }

  addProduct(product: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer your-token-goes-here'
    });

    return this.http.post(this.apiURL, product, { headers });
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put(`${this.apiURL}/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  searchProducts(name: string): Observable<any> {
    const params = new HttpParams().set('name', name);
    return this.http.get(this.apiURL, { params });
  }
}