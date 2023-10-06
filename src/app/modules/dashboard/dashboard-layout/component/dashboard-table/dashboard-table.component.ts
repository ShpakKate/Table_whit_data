import { Component } from '@angular/core';
import {UserFull} from "../../../../shared/interfaces/user-full";

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss']
})
export class DashboardTableComponent {

  public show = true;

  toggle() {
    this.show = !this.show;
    console.log(this.show)
  }

  toggleChange($event: boolean) {
    this.show = $event;
  }

  applyFilterForm($event: UserFull) {
    console.log($event);
  }
}
