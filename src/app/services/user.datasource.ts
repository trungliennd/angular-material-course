import {DataSource, CollectionViewer} from '@angular/cdk/collections';
import {User} from '../model/user';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs';
import {UserService} from './user.service';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

export class UserDatasource implements DataSource<User> {

  private userSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private userService: UserService) {

  }

  loadLessons() {
    this.loadingSubject.next(true);
    this.userService.findAllUser().pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(user => this.userSubject.next(user));
  }


  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    console.log('Connecting data source');
    return this.userSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.userSubject.complete();
    this.loadingSubject.complete();
  }

}
