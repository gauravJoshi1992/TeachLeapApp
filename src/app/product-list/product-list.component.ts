import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../service/product-list.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { convertToObject } from 'typescript';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [NgbRatingConfig]
})
export class ProductListComponent implements OnInit {
 public  productList: any;
 public filteredProductList: any;
 public selectedType: string[] = [];
 public filter: any = {
   "gender": [
    {"title":"Man"},
    {"title":"Woman"},
    {"title":"Boys"},
    {"title":"Girls"},
   ],
   "Category": [
     {"title": "man's clothing"},
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
      this.productList = res;
      this.filteredProductList = res;
    });
  }

  filterData(e: any){
    if(e.target.checked){
      this.selectedType.push(e.target.name.toLowerCase())
    } else{
      const index = this.selectedType.indexOf(e.target.name.toLowerCase());
      this.selectedType.splice(index,1);
    }
    this.filteredProductList = []
    console.log(this.selectedType);
    this.filteredProductList = this.productList.filter((val: { category: string }) => {return this.selectedType.includes(val.category)});
    // this.productList.filter(val => {return val.includes('man')})
    console.log(this.filteredProductList);
  }
}
