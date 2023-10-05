import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {Subject, takeUntil} from "rxjs";
import {UsersService} from "../../../../../services/users.service";
import {UserFull} from "../../../../shared/interfaces/user-full";
import {Paginator} from "../../../../shared/components/paginator";
import {SelectionModel} from "@angular/cdk/collections";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  public  form!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly userService: UsersService,
    private readonly elementRef: ElementRef,
    private readonly ren: Renderer2,
    private readonly fb: FormBuilder,

  ) {
  }

  ngOnInit() {
    this.userService.getUsers().pipe(
      takeUntil(this.unsubscribe)
    )
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

  filterBySubject() {
    let filterFunction =
      (data: UserFull, filter: string): boolean => {
        if (filter) {
          const name = data.name;
          for (let i = 0; i < name.length; i++) {
            if (name[i].indexOf(filter) != -1) {
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
