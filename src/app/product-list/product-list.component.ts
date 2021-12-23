import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../service/product-list.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [NgbRatingConfig]
})
export class ProductListComponent implements OnInit {
 public  productList: any;
 public height: any = '10rem';
 public width: any = '10rem';
 public filter: any = {
   "gender": [
    {"title":"Men"},
    {"title":"Women"},
    {"title":"Boys"},
    {"title":"Girls"},
   ],
   "Category": [
     {"title": "men's clothing"},
     {"title": "jewelery"},
     {"title": "electronics"},
     {"title": "women's clothing"}
   ]
 }
  genderData: any;
  categoryData: any;
  constructor(private productListService: ProductListService) { }

  ngOnInit() {
    this.genderData = this.filter.gender;
    this.categoryData = this.filter.Category
    this.getProductList();
  }

  getProductList()
  {
   this.productListService.getProductList().subscribe(res => {
     console.log(res);
      this.productList = res;
    });
  }
}
