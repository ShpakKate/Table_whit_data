import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardLayoutComponent} from './dashboard-layout/dashboard-layout.component';
import {DashboardPanelComponent} from './dashboard-layout/dashboard-panel/dashboard-panel.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardTableComponent} from './dashboard-layout/dashboard-table/dashboard-table.component';
import {TableDataComponent} from "./dashboard-layout/dashboard-table/table-data/table-data.component";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {FormFilterComponent} from './dashboard-layout/dashboard-table/form-filter/form-filter.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule} from "@angular/material/core";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardPanelComponent,
    DashboardTableComponent,
    TableDataComponent,
    FormFilterComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatListModule,
  ],
})
export class DashboardModule { }
