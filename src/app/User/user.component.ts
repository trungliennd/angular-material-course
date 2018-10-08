import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../model/user';
import {UserDatasource} from '../services/user.datasource';
import {MatPaginator, MatSort} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {merge} from 'rxjs/observable/merge';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {
  user: User;
  dataSoure: UserDatasource;
  displayedColums = ['id', 'name', 'age', 'status', 'timeCreate'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private route: ActivatedRoute,
              private userService: UserService) {

  }


  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadLessonsPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();
  }

  ngOnInit(): void {
    // this.user = this.route.snapshot.data['user'];
    this.dataSoure = new UserDatasource(this.userService);
    this.dataSoure.loadLessons();
  }

  loadLessonsPage() {
    this.dataSoure.loadLessons();
  }

}
