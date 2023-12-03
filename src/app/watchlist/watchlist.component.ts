import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { Movie } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';
import { ViewType } from '../shared/enums/viewtype.enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit{
  readonly ViewType = ViewType;
  watchlist$!: Observable<Movie[]>
  refreshWatchlist$ = new BehaviorSubject<boolean>(false);

  constructor(
    private movieService: MovieService,
    private snackbar: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.watchlist$ = this.refreshWatchlist$.pipe(
      switchMap(_ => this.movieService.getMovies().pipe(
        map(movies => movies.filter(w => {
          const watchlist = this.movieService.getWatchList();

          return watchlist.includes(w.movieId);
        }))
      )))
  }

  removeWatchList() {
    this.snackbar.open('Successfully removed from watchlist', 'close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    })

    this.refreshWatchlist$.next(true)
  }
}
