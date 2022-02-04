import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductListService } from '../service/product-list.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {

  public productList: any;
  public data = {
          "policyDetails": [
            {
              "policyNumber": "0011081457",
              "source": "CIP",
              "lineOfBusiness": "Auto",
              "totalPremium": 2801.0,
              "effectiveDate": "02/22/2021",
              "expirationDate": "02/22/2022",
              "address": null,
              "riskState": null,
              "isPrimaryLocation":'Y'
            },
            {
              "policyNumber": "0011081469",
              "source": "CIP",
              "lineOfBusiness": "Auto",
              "totalPremium": 2900.0,
              "effectiveDate": "02/22/2021",
              "expirationDate": "02/22/2022",
              "address": null,
              "riskState": null,
              "isPrimaryLocation": null
            },
            {
              "policyNumber": "0012094617",
              "source": "CIP",
              "lineOfBusiness": "HomeOwners",
              "totalPremium": 1599.0,
              "effectiveDate": "02/22/2021",
              "expirationDate": "02/22/2022",
              "address": "2582 street  , New York, NY, 10011",
              "riskState": "NY",
              "isPrimaryLocation": null
            },
            {
              "policyNumber": "0012094651",
              "source": "CIP",
              "lineOfBusiness": "HomeOwners",
              "totalPremium": 1871.0,
              "effectiveDate": "02/23/2021",
              "expirationDate": "02/23/2022",
              "address": "2582 street  , Bell Gardens, CA, 90201",
              "riskState": "CA",
              "isPrimaryLocation": "Y"
            },
            {
              "policyNumber": "0013046583",
              "source": "CIP",
              "lineOfBusiness": "Excess Liability",
              "totalPremium": 850.0,
              "effectiveDate": "02/23/2021",
              "expirationDate": "02/23/2022",
              "address": "2582 street , Brownsville , TX , 78521",
              "riskState": "TX",
              "isPrimaryLocation": "Y"
            },
            {
              "policyNumber": "0014049463",
              "source": "CIP",
              "lineOfBusiness": "Private Collections",
              "totalPremium": 13.0,
              "effectiveDate": "02/23/2021",
              "expirationDate": "02/23/2022",
              "address": "2582 street , Bell Gardens , CA , 90201",
              "riskState": "CA",
              "isPrimaryLocation": "Y"
            },
            {
              "policyNumber": "0015003982",
              "source": "CIP",
              "lineOfBusiness": "Earthquake",
              "totalPremium": 357.0,
              "effectiveDate": "02/23/2021",
              "expirationDate": "02/23/2022",
              "address": "2582 street , Bell Gardens , CA , 90201     ",
              "riskState": "CA",
              "isPrimaryLocation": "Y"
            },
            {
              "policyNumber": "0011084087",
              "source": "CIP",
              "lineOfBusiness": "Auto",
              "totalPremium": 3409.0,
              "effectiveDate": "02/15/2021",
              "expirationDate": "02/15/2022",
              "address": null,
              "riskState": null,
              "isPrimaryLocation": "Y"
            }
          ]
        };

  public POLICY_ENUM:any = {
      'All' : 0,
      'HomeOwners' : 1,
      'Auto' : 2,
      'Earthquake' : 3,
      'Excess Liability' : 4,
      'Private Collections' : 5,
      'Y' : 6,
      'null' : 7
  
    };
  product: any;
  constructor(private productListService: ProductListService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sortData();
    this.activatedRoute.params.subscribe(params => {
      this.productListService.getProduct(params.id).subscribe(res => {this.product = res});
    })
  }

    public compareEnumVals(a: any,b: any){
        if(this.POLICY_ENUM[a] > this.POLICY_ENUM[b])
            return 1;
        else if(this.POLICY_ENUM[a] < this.POLICY_ENUM[b])
            return -1;
        return 0;
    }
    
     public sortData(){
        const newData = this.data.policyDetails.sort((a,b) => this.compareEnumVals(a.lineOfBusiness, b.lineOfBusiness));
        const homeOwners = this.data.policyDetails.filter(x => x.lineOfBusiness === 'HomeOwners');
        homeOwners.sort((a,b) => this.compareEnumVals(a.isPrimaryLocation, b.isPrimaryLocation))
        const auto = this.data.policyDetails.filter(x => x.lineOfBusiness === 'Auto');
        auto.sort((a,b) => this.compareEnumVals(a.isPrimaryLocation, b.isPrimaryLocation))
        const earthquake = this.data.policyDetails.filter(x => x.lineOfBusiness === 'Earthquake');
        earthquake.sort((a,b) => this.compareEnumVals(a.isPrimaryLocation, b.isPrimaryLocation))
        const excessLiability = this.data.policyDetails.filter(x => x.lineOfBusiness === 'Excess Liability');
        excessLiability.sort((a,b) => this.compareEnumVals(a.isPrimaryLocation, b.isPrimaryLocation))
        const privateCollections = this.data.policyDetails.filter(x => x.lineOfBusiness === 'Private Collections');
        privateCollections.sort((a,b) => this.compareEnumVals(a.isPrimaryLocation, b.isPrimaryLocation))

        //  const newData = this.data.policyDetails.sort((a,b) => a.totalPremium - b.totalPremium);
        console.log(homeOwners.concat(auto, earthquake, excessLiability, privateCollections));
      }


}
