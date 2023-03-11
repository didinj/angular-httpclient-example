import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Smartphone } from './smartphone';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

export interface Product {
  _id: string;
  prod_name: string;
  prod_desc: string;
  prod_price: number;
  updated_at: Date;
}

const endpoint = 'http://localhost:3000/api/v1/';

const localUrl = 'assets/data/smartphone.json';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/xml',
    'Authorization': 'jwt-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => 'Something bad happened; please try again later.');
  }

  // getSmartphone() {
  //   return this.http.get(localUrl);
  // }

  // getSmartphone(): Observable<HttpResponse<Smartphone[]>> {
  //   return this.http.get<Smartphone[]>(
  //     localUrl, { observe: 'response' });
  // }

  // getSmartphone(): Observable<any> {
  //   return this.http.get<Smartphone[]>(localUrl, httpOptions).pipe(
  //     retry(3), catchError(this.handleError));
  // }

  getSmartphone(): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
    return this.http.get<Smartphone[]>(localUrl, httpOptions).pipe(
      retry(3), catchError(this.handleError));
  }

  getSmartphoneById(id: any): Observable<any> {
    return this.http.get<Smartphone>(localUrl + id).pipe(
      retry(3), catchError(this.handleError));
  }

  // getProducts(): Observable<any> {
  //   return this.http.get(endpoint + 'products').pipe(
  //     map(() => this.extractData),
  //     catchError(this.handleError)
  //   );
  // }

  // getProduct(id: string): Observable<any> {
  //   return this.http.get(endpoint + 'products/' + id).pipe(
  //     map(() => this.extractData),
  //     catchError(this.handleError)
  //   );
  // }

  getProducts(): Observable<any> {
    return this.http.get<Product>(endpoint + 'products').pipe(
      catchError(this.handleError)
    );
  }

  getProduct(id: string): Observable<any> {
    return this.http.get<Product>(endpoint + 'products/' + id).pipe(
      catchError(this.handleError)
    );
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(endpoint + 'products', product).pipe(
      catchError(this.handleError)
    );
  }

  updateProduct(id: string, product: Product): Observable<any> {
    return this.http.put<Product>(endpoint + 'products/' + id, product).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<Product>(endpoint + 'products/' + id).pipe(
      catchError(this.handleError)
    );
  }
  
}
