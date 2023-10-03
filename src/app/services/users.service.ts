import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = 'http://cars.cprogroup.ru/api/rubetek/angular-testcase-list/';

  constructor(
    private readonly http: HttpClient
  ) { }

  public getUsers(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
