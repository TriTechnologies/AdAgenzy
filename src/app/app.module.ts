import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AmplifyAuthenticatorModule } from "@aws-amplify/ui-angular";

import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';

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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ProductsService } from "src/app/products.service";
import { AddRulesComponent } from './add-rules/add-rules.component';
import { PriceChangesComponent } from './price-changes/price-changes.component';
import { StrategyComponent } from './strategy/strategy.component';
import { PriceMinMaxComponent } from './price-min-max/price-min-max.component';
import { CompetitorsStockComponent } from './competitors-stock/competitors-stock.component';
import { RoundPriceComponent } from './round-price/round-price.component';
import { FilterProductsComponent } from './filter-products/filter-products.component';






@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    TopNavComponent,
    HomeComponent,
    DashboardComponent,
    ProductsComponent,
    CompetitorsComponent,
    ProductDetailsComponent,
    ManualPricingComponent,
    BulkPricingComponent,
    IntegrationsComponent,
    WooCommerceComponent,
    MyAccountComponent,
    LoginPageComponent,
    AddRulesComponent,
    PriceChangesComponent,
    StrategyComponent,
    PriceMinMaxComponent,
    CompetitorsStockComponent,
    RoundPriceComponent,
    FilterProductsComponent
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, 
    AmplifyAuthenticatorModule,
    FormsModule,
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent],
 
})

export class AppModule { }
