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
  constructor(private productListService: ProductListService) { }

  ngOnInit() {
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
