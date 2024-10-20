import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/model.component';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  baseUrl = 'http://localhost:3000/users';

  public _userList$ = new BehaviorSubject<User[]>([]);
  public userList$ = this._userList$.asObservable();
  constructor(private http: HttpClient) {}

  addUser(userData: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, userData);
  }
  getUser(): Observable<User> {
    return this.http.get<User>(this.baseUrl);
  }

  setUserList(list: any) {
    this._userList$.next(list);
  }

  getUserList(): Observable<any> {
    return this._userList$;
  }
}
