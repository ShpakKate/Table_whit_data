import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {Subject, takeUntil} from "rxjs";
import {UsersService} from "../../../../../services/users.service";
import {UserFull} from "../../../../shared/interfaces/user-full";
import {Paginator} from "../../../../shared/components/paginator";
import {SelectionModel} from "@angular/cdk/collections";

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

    this.selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);

    this.dataSource.filterPredicate = this.createFilter();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.getFilteredForm();

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
          console.log(this.dataSource.data);
        }
      )
  }

  getFilteredForm() {
    this.userService.getFilteredForm()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        data => {
          if (data) {
            this.resetFilters();
            this.filterValues = data;
            console.log(this.filterValues);

            this.dataSource.filter = JSON.stringify(this.filterValues).trim().toLowerCase();
          } else return;
        }
      )
  }

  private createFilter(): (user: UserFull, filter: string) => boolean {
    let filterFunction = (user: UserFull, filter: string): boolean => {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;

      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }
      console.log(searchTerms)
      let nameSearch = () => {
        let found = false;
        let notFound: boolean;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach((word: string) => {
              if (notFound) {
                return;
              } else  {
                console.log(user[(col as keyof UserFull)])
                if (user[(col as keyof UserFull)].toString().toLowerCase().includes(word) && isFilterSet) {
                  found = true;
                } else {
                  found = false;
                  notFound = true;
                  return;
                }
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction;
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

  resetFilters() {
    this.filterValues = {};
    this.dataSource.filter = "";
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
