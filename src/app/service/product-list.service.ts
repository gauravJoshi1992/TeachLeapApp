import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  public selectedProduct = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
   }

   getProductList(): Observable<any>{
     return this.http.get('http://localhost:4000/productList');
   }

   getProduct(id: Number) {
    return this.http.get(`http://localhost:4000/product/${id}`);
  }
}
