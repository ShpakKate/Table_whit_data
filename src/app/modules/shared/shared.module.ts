import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhoneNumberPipe} from './pipe/phone-number.pipe';
import {MatTableModule} from "@angular/material/table";
import {DateUnixPipe} from './pipe/date-unix.pipe';
import { IsMobileDirective } from './directives/is-mobile.directive';


@NgModule({
  declarations: [
    PhoneNumberPipe,
     DateUnixPipe,
     IsMobileDirective,
  ],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [
    PhoneNumberPipe,
    IsMobileDirective,
  ]
})
export class SharedModule { }
