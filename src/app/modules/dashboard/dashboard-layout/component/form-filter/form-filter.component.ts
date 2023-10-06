import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserFull} from "../../../../shared/interfaces/user-full";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../../../services/users.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-form-filter',
  templateUrl: './form-filter.component.html',
  styleUrls: ['./form-filter.component.scss']
})
export class FormFilterComponent implements OnInit, OnDestroy {

  public form! : FormGroup;
  private unsubscribe = new Subject();
  public dataSource = new MatTableDataSource<UserFull>();

  @Input() arrUsers!: UserFull[];
  @Input() name?: string;
  @Input() show!: boolean;
  @Output() close = new EventEmitter();
  @Output() getFilterForm = new EventEmitter();

  constructor(
    private readonly fb: FormBuilder,
    private readonly usersService: UsersService,
  ) {
  }

  ngOnInit() {
    this.loadData();

    this.dataSource.data = this.arrUsers;

    // this.dataSource.filterPredicate =
    //   (data: UserFull, filter: string) => data.name.indexOf(filter) != -1;
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  loadData() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [
        Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$')]],
      create_at: ['', Validators.required],
      status: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[az]{2, 4}$")]],
      is_admin: ['', Validators.required],
      update_at: ['', Validators.required],
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  apply() {
    this.getFilterForm.emit(this.form.value);
    this.usersService.isFilteredData(this.form.value);
  }


  cancel() {
    this.show = false;
    this.close.emit(false);
  }

  reset() {
    this.form.reset();
    this.form.markAsPristine();
  }
}
