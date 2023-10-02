import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardPanelComponent } from './dashboard-layout/dashboard-panel/dashboard-panel.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import { DashboardTableComponent } from './dashboard-layout/component/dashboard-table/dashboard-table.component';



@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardPanelComponent,
    DashboardTableComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
