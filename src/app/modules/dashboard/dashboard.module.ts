import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardPanelComponent } from './dashboard-layout/dashboard-panel/dashboard-panel.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import { DashboardTableComponent } from './dashboard-layout/component/dashboard-table/dashboard-table.component';
import {TableDataComponent} from "./dashboard-layout/component/table-data/table-data.component";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import { FormFilterComponent } from './dashboard-layout/component/form-filter/form-filter.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {CustomPaginationDirective} from "../shared/directives/custom-pagination.directive";
import {SharedModule} from "../shared/shared.module";

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
    CustomPaginationDirective,
    SharedModule,
  ]
})
export class DashboardModule { }
