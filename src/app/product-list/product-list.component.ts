import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../service/product-list.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { State, Store } from '@ngrx/store';
import { ADD_PRODUCT_LIST } from '../store/actions/products-list.action';
import { selectAllProductsList } from '../store/selectors/products.selector';
import { AppState } from '../store/state/app.state';

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
  public produc = this.store.select(selectAllProductsList);
  constructor(private productListService: ProductListService, private store: Store<AppState>) { }

  ngOnInit() {
    this.genderData = this.filter.gender;
    this.categoryData = this.filter.Category;
    this.produc.subscribe(productList => {
      console.log(productList)
      if (productList.length > 0) {
        this.productList = productList;
        this.filteredProductList = productList;
      } else {
        this.getProductList();
      }
    });
  }

  getProductList()
  {
   this.productListService.getProductList().subscribe(res => {
     console.log(typeof res);
      this.productList = res;
      this.filteredProductList = res;
      this.store.dispatch(ADD_PRODUCT_LIST({ productList: this.productList }));
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

  onClick(item: any) {
    this.productListService.selectedProduct.next(item);
  }
}
