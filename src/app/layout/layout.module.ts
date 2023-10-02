import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {LayoutComponent} from "./layout.component";
import {LayoutRoutingModule} from "./layout-routing.module";



@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
  ]
})
export class LayoutModule { }
