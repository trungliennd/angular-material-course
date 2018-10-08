import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {

  }

  findUserById(userId: number): Observable<User> {
    return this.http.get<User>(`http://5b558784503d920014688747.mockapi.io/employees/${userId}`);
  }

  findAllUser(): Observable<User[]> {
    return this.http.get(`http://5b558784503d920014688747.mockapi.io/employees`)
        .pipe(
          map(res => res)
        );
  }
}
