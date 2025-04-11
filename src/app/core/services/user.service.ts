import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<any> {
    const params = new HttpParams().append('page', '1');

    return this.http.get<any>('https://req44res.in/api/users', {
      params,
    }).pipe(
      map(resp => resp.data)
    )
  }

  getUserById(id: number): Observable<any> {

    return this.http.get<any>(`https://reqres.in/api/users/${id}`).pipe(
      map(resp => resp.data)
    )
  }
}
