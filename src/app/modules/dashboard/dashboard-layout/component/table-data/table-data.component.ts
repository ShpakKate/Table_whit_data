import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {Subject, takeUntil} from "rxjs";
import {UsersService} from "../../../../../services/users.service";
import {UserFull} from "../../../../shared/Interfaces/user-full";
import {Paginator} from "../../../../shared/components/paginator";

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
  private arrayUsers: UserFull[] = [];
  displayedColumns: string[] = [
    'action', 'login','email', 'phone', 'role', 'updateData', 'createData', 'status', 'salary'
  ];
  dataSource = new MatTableDataSource<any>();
  public numberOfRecords = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private readonly userService: UsersService,
    private readonly cdr: ChangeDetectorRef,
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

        console.log(data)

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

        console.log(this.dataSource.data)
      }
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  public onCheck(el: boolean) {

    console.log(el)

    if (el) {
      this.numberOfRecords ++;
    } else this.numberOfRecords --;

    console.log(this.numberOfRecords)
  }

  public onCheckAll(el: boolean) {
    if (el) {
      this.numberOfRecords = this.arrayUsers.length
    } else this.numberOfRecords = 0;
    console.log(this.numberOfRecords);

  }
}
