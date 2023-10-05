import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomPaginationDirective} from "./directives/custom-pagination.directive";
import {PhoneNumberPipe} from './pipe/phone-number.pipe';
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [

    PhoneNumberPipe,
  ],
  imports: [
    CommonModule,
    CustomPaginationDirective,
    MatTableModule
  ],
  exports: [
    PhoneNumberPipe,
  ]
})
export class SharedModule { }
