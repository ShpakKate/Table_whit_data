import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardLayoutComponent} from "./dashboard-layout/dashboard-layout.component";
import {DashboardTableComponent} from "./dashboard-layout/dashboard-table/dashboard-table.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'table'
      },
      {
        path: 'table',
        pathMatch: 'full',
        component: DashboardTableComponent
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
