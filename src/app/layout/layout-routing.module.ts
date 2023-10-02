import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./layout.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      }
    ]
  },
  {
    path: '*',
    redirectTo: '404'
  }
]

@NgModule({
  imports: [
    [RouterModule.forChild(routes)]
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRoutingModule { }
