import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserFull} from "../../../../shared/interfaces/user-full";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../../../services/users.service";
import {Subject, takeUntil} from "rxjs";
import {DateUnixPipe} from "../../../../shared/pipe/date-unix.pipe";

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
  @Output() formStorage =new EventEmitter();

  constructor(
    private readonly fb: FormBuilder,
    private readonly usersService: UsersService,
    private readonly dateUnix: DateUnixPipe
  ) {
  }

  ngOnInit() {
    this.loadData();

    this.dataSource.data = this.arrUsers;

    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe( form => {
        this.formStorage.emit(form);
      })

  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  loadData() {
    this.form = this.fb.group({
      name: [''],
      phone: ['', [
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$'),
        Validators.pattern("^[0-9]*$")
      ]],
      create_at: [''],
      status: [''],
      email: ['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[az]{2, 4}$")]],
      is_admin: [''],
      update_at: [''],
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  apply() {
    if (this.form.get('update_at')?.value !== '') {
      const maskedVal =  this.dateUnix.transform(this.form.get('update_at')?.value);
      this.form.patchValue({update_at: maskedVal});
    }

    if (this.form.get('create_at')?.value !== '') {
      const maskedVal =  this.dateUnix.transform(this.form.get('create_at')?.value);
      this.form.patchValue({create_at: maskedVal});
    }

    console.log(this.form.value)

    if (this.form.value !== null) {
      this.usersService.isFilteredData(this.form.value);

      this.form.markAsPristine();
      this.form.markAsUntouched();
    }
  }

  cancel() {
    this.show = false;
    this.close.emit(false);

    this.reset();
  }

  reset() {
    this.loadData();
    this.usersService.isFilteredData(this.form.value);
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
