import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {UserFull} from "../modules/shared/interfaces/user-full";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private filteredData$ = new Subject<UserFull>();
  url: string = 'http://cars.cprogroup.ru/api/rubetek/angular-testcase-list/';

  constructor(
    private readonly http: HttpClient
  ) { }

  public getUsers(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  public isFilteredData(data: UserFull){
    this.filteredData$.next(data);
  }

  public getFilteredForm(): Observable<any> {
    return this.filteredData$;
  }
}
