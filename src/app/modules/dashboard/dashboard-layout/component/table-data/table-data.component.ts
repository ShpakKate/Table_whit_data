import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {Subject, takeUntil} from "rxjs";
import {UsersService} from "../../../../../services/users.service";
import {UserFull} from "../../../../shared/interfaces/user-full";
import {Paginator} from "../../../../shared/components/paginator";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSelectChange} from "@angular/material/select";

export interface EmpFilter {
  name:string;
}

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
  providers: [{
    provide: MatPaginatorIntl,
    useClass: Paginator
  }],
})
export class TableDataComponent implements OnInit, AfterViewInit, OnDestroy{

  private unsubscribe = new Subject();
  private userSet: any;
  public arrayUsers: UserFull[] = [];
  displayedColumns: string[] = [
    'action', 'login','email', 'phone', 'role', 'updateData', 'createData', 'status', 'salary'
  ];
  public dataSource = new MatTableDataSource<UserFull>();
  public numberOfRecords = 0;
  public selection?:  any;
  public initialSelection = [];
  public allowMultiSelect = true;
  private filteredFormForFilter!: any;

  filterValues: any = {
    name: '',
    email: '',
    phone: '',
    is_admin: '',
    update_at: '',
    create_at: '',
    status: '',
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly userService: UsersService,
    private readonly elementRef: ElementRef,
    private readonly ren: Renderer2,
  ) {
  }

  ngOnInit() {
    this.loadData();

    this.getFilteredForm();

    this.selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);
    this.dataSource.filterPredicate = this.filterBySubject();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    const table = this.elementRef.nativeElement.querySelector('.mat-mdc-table');
    const body =  this.elementRef.nativeElement.querySelector('tbody.mdc-data-table__content');

    this.ren.setStyle(table,'table-layout', 'fixed');
    this.ren.setStyle(body, 'background', '#FFFFFF');
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  loadData() {
    this.userService.getUsers()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        data => {
          const users = data.users;
          const part2 = data.data;

          users.forEach( (user: any) => {
            let num = user.id;
            part2.filter( (userID: any) => {
              if (num === userID.user_id) {
                this.userSet = {...user, ...userID} as UserFull;
                this.arrayUsers.push(this.userSet);
              }
            })
          })
          this.dataSource.data = this.arrayUsers;
        }
      )
  }

  getFilteredForm() {
    this.filteredFormForFilter = this.userService.getFilteredForm()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        data => {
          this.filteredFormForFilter = data;
          this.filterValues.name = data.name.value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  toggleAllRows() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  apply(data: any) {
    for (let key in data) {
      if (data[key][1] !== '') {
        const value = data[key][0];
        console.log(value)
        // for (let i = 0; i < value.length; i++) {
        //   if (value[i].indexOf(data[key][1]) != -1) {
        //     return true;
        //   }
        // }
        // this.dataSource.filterPredicate = this.filterBySubject(data[key][0], data[key][1]);
      }
    }
  }

  filterBySubject() {
    let filterFunction =
      (data: UserFull, filter: string): boolean => {
        console.log(data, filter)
        if (filter) {
          const value = data.name
          console.log(value)
          for (let i = 0; i < value.length; i++) {
            if (value[i].indexOf(filter) != -1) {
              return true;
            }
          }
          return false;
        } else {
          return true;
        }
      };
    return filterFunction;
  }

}



// public onCheck(el: boolean) {
//
//   if (el) {
//     this.numberOfRecords ++;
//   } else this.numberOfRecords --;
//
//   this.countService.changeCount(this.numberOfRecords);
//   console.log(this.numberOfRecords)
// }
//
// public onCheckAll(el: boolean) {
//   if (el) {
//     this.numberOfRecords = this.arrayUsers.length;
//
//   } else this.numberOfRecords = 0;
//
//   this.countService.changeCount(this.numberOfRecords);
//   console.log(this.numberOfRecords);
// }
