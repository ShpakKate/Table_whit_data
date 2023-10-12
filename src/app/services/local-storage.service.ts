import { Injectable } from '@angular/core';
import {UserFull} from "../modules/shared/interfaces/user-full";
import {Observable} from "rxjs";
import {JSDocComment} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private key = '123';

  saveUserForm(userForm: UserFull) : void {
    localStorage.setItem(this.key, JSON.stringify(userForm));
  }

  getUserForm() {
    const obj = localStorage.getItem(this.key);
    return !!obj ? JSON.parse(obj) : null
  }

  removeUserForm(key: string) {
    localStorage.removeItem(this.key);
  }

  clearAllForms() {
    localStorage.clear();
  }
}
