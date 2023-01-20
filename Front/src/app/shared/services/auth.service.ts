import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from '../models/user.interface';

import { ENVIRONNEMENT } from '../environnement/environnement';

@Injectable({
  providedIn: 'root'
})

// proxy.conf.json for localhost

export class AuthService {
  private API_URL = ENVIRONNEMENT.API_URL;
  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user: Observable<string>
  public userSubject: BehaviorSubject<string>

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<string>(localStorage.getItem('token') || '');
    this.user = this.userSubject.asObservable();
  }

  public register(user: User): Observable<any> {
    return this.http.post(this.API_URL + '/register', user);
  }

  public login(body: { username: string, password: string }): Observable<string> {
    return this.http.post<string>(this.API_URL + '/login', body).pipe(
      tap((user: string) => {
        if (user) {
          this.userSubject.next(user);
        }
      }));
  }

  public getUser() {
    return this.http.get<User>(this.API_URL + '/me').pipe(
      tap((user: User) => {
        if (user) {
          this.user$.next(user);
        }
      }
      ));
  }

  public modifyUser(id: number, user: User) {
    return this.http.put<User>(this.API_URL + `/user/${id}`, user);
  }

  public deleteUser(id: number) {
    return this.http.delete<User>(this.API_URL + `/user/${id}`);
  }

  public readUsers() {
    return this.http.get<User[]>(this.API_URL + '/users');
  }

  public logout(): Observable<any> {
    return this.http.get(this.API_URL + '/logout').pipe(
      tap(() => {
        this.userSubject.next('');
      })
    )
  }

  //chiffre d'affaire
  public readMoney(id: any) {
    return this.http.get(this.API_URL + `/money/${id}`);
  }

  public createMoney(user: User) {
    return this.http.post(this.API_URL + `/money/create`, user);
  }

  public updateMoney(id: number, montant: number) {
    console.log(montant);
    return this.http.put(this.API_URL + `/money/${id}`, { montant });
  }
}
