import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import { ItemListingComponent } from './item-listing/item-listing.component';
import { ItemsService } from './services/items.service';
import { itemFilterPipe } from './item-filter/item-filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    ItemListingComponent,
    itemFilterPipe
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFontAwesomeModule,
    NgxPaginationModule
    
    
    
  ],
  providers: [ItemsService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
