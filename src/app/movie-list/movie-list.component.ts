import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/services/movie.service';
import { BehaviorSubject, Observable, delay, map, switchMap } from 'rxjs';
import { Movie } from '../shared/models/movie.model';
import { Sort } from '../shared/enums/sort.enum';
import { SortDirection } from '../shared/enums/sort-direction.enum';
import { SortBy } from '../shared/models/sortby.model';
import { ViewType } from '../shared/enums/viewtype.enum';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  readonly Sort = Sort
  readonly SortDirection = SortDirection
  readonly ViewType = ViewType
  private refreshMovies$ = new BehaviorSubject<boolean>(true)
  movies$!: Observable<Movie[]>;
  rippleDisabled: boolean = false;
  viewType: ViewType = ViewType.GRID;
  sort: SortBy = {
    property: Sort.RELEASE_DATE,
    direction: SortDirection.ASCENDING
  }

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movies$ = this.refreshMovies$.pipe(switchMap(_ => {
      return this.movieService.getMovies()
        .pipe(
          map(movies => {
            return movies.sort(this.sortData(this.sort.property, this.sort.direction))
          }))
    }));
  }

  sortData(property: Sort, order: SortDirection) {
    return (a: Movie, b: Movie) => {
      const valueA = property === Sort.RELEASE_DATE ? new Date(a.releasedDate) : a.title;
      const valueB = property === Sort.RELEASE_DATE ? new Date(b.releasedDate) : b.title;

      if (order === SortDirection.ASCENDING) {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      }

      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }
  }

  refreshData() {
    this.refreshMovies$.next(true);
  }

  setRippleDisabled(isDisabled: boolean) {
    this.rippleDisabled = isDisabled;
  }

  toggleSortDirection() {
    this.sort.direction = this.sort.direction === SortDirection.ASCENDING ?
      SortDirection.DESCENDING :
      SortDirection.ASCENDING

    this.refreshData();
  }

  onChangeProperty(data: Sort) {
    this.sort.property = data;
    this.refreshData();
  }

  addToWatchlist() {
    this.refreshData();
  }
}
