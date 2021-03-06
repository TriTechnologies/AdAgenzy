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
        path: "bulkpricing",
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
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
