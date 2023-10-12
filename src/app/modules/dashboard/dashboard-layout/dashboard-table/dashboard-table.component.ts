import {Component} from '@angular/core';
import {UserFull} from "../../../shared/interfaces/user-full";
import {LocalStorageService} from "../../../../services/local-storage.service";

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss']
})
export class DashboardTableComponent {

  public show = true;
  private form?: UserFull;

  constructor(
    private readonly localStorageService: LocalStorageService,
  ) {
  }

  toggle() {
    this.show = !this.show;
  }

  setFormStorage($event: any) {
    this.form = $event;
  }

  saveForm() {
    if (this.form) {
      this.localStorageService.saveUserForm(this.form);
    }
  }

  getForm() {
    this.form = this.localStorageService.getUserForm();
    console.log(this.form)
  }
}
