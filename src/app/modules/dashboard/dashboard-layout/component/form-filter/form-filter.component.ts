import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserFull} from "../../../../shared/interfaces/user-full";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-filter',
  templateUrl: './form-filter.component.html',
  styleUrls: ['./form-filter.component.scss']
})
export class FormFilterComponent implements OnInit {

  form! : FormGroup;
  public dataSource = new MatTableDataSource<UserFull>();

  @Input() arrUsers!: UserFull[];
  @Input() name?: string;

  constructor(
    private readonly fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.loadData();

    this.dataSource.data = this.arrUsers;

    // this.dataSource.filterPredicate =
    //   (data: UserFull, filter: string) => data.name.indexOf(filter) != -1;
  }

  loadData() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [
        Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$')]],
      create_at: ['', Validators.required],
      status: ['', Validators.required],
      email: ['', Validators.required],
      is_admin: ['', Validators.required],
      update_at: ['', Validators.required],
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
