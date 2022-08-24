import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ProductsComponent } from './products/products.component';
import { CompetitorsComponent } from './competitors/competitors.component';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { ManualPricingComponent } from './manual-pricing/manual-pricing.component';

import { BulkPricingComponent } from './bulk-pricing/bulk-pricing.component';
import { IntegrationsComponent } from './integrations/integrations.component';

import { WooCommerceComponent } from './woo-commerce/woo-commerce.component';
import { MyAccountComponent } from './my-account/my-account.component';

import { LoginPageComponent } from './login-page/login-page.component';
import { AddRulesComponent } from './add-rules/add-rules.component';

import { PriceChangesComponent } from './price-changes/price-changes.component';
import { StrategyComponent } from './strategy/strategy.component';

import { PriceMinMaxComponent } from './price-min-max/price-min-max.component';
import { CompetitorsStockComponent } from './competitors-stock/competitors-stock.component';

import { RoundPriceComponent } from './round-price/round-price.component';
import { FilterProductsComponent } from './filter-products/filter-products.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: "loginpage",
    component: LoginPageComponent,
    children: []
  },
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "products",
        component: ProductsComponent
      },
      {
        path: "competitors",
        component: CompetitorsComponent
      },
      {
        path: "productdetails",
        component: ProductDetailsComponent
      },
      {
        path: "manualpricing",
        component: ManualPricingComponent
      },
      {
        path: "settings",
        component: BulkPricingComponent
      },
      {
        path: "integrations",
        component: IntegrationsComponent
      },
      {
        path: "woocommerce",
        component: WooCommerceComponent
      },
      {
        path: "myaccount",
        component: MyAccountComponent
      },
      {
        path: "addrules",
        component: AddRulesComponent
      },
      {
        path: "pricechanges",
        component: PriceChangesComponent
      },
      {
        path: "strategy",
        component: StrategyComponent
      },
      {
        path: "priceminmax",
        component: PriceMinMaxComponent
      },
      {
        path: "competitorstock",
        component: CompetitorsStockComponent
      },
      {
        path: "roundprice",
        component: RoundPriceComponent
      },
      {
        path: "filterproducts",
        component: FilterProductsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
