import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

import { NgxPaginationModule } from 'ngx-pagination';

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
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    AmplifyAuthenticatorModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
 
})

export class AppModule { }
