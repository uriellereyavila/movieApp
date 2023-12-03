import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/services/movie.service';
import { BehaviorSubject, Observable, endWith, map, switchMap } from 'rxjs';
import { Movie } from '../shared/models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { Sort } from '../shared/enums/sort.enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  private refreshMovies$ = new BehaviorSubject<boolean>(true);
  movieDetails$!: Observable<Movie>
  movies$!: Observable<Movie[]>
  otherMovies$!: Observable<Movie[]>
  sort!: Sort
  movieId!: string;
  // movieId!: string;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.movieId = p['movieId'];
      this.initializeData(p['movieId'])
    })
  }

  initializeData(movieId: string) {
    this.movies$ = this.refreshMovies$.pipe(switchMap(_ => this.movieService.getMovies()))
    this.movieDetails$ = this.movies$.pipe(map(movies => {
      return movies.find(m => m.movieId === movieId) as Movie
    }))
    this.otherMovies$ = this.movies$.pipe(map(movies => {
      return movies.filter(m => m.movieId !== movieId)
    }))
  }

  getMovieImage(title: string) {
    return this.movieService.getMovieImage(title)
  }

  isMovieWatchList() {
    return this.movieService.isMovieWatchList(this.movieId)
  }

  addToWatchList() {
    this.movieService.addWatchlist(this.movieId)
    this.snackbar.open("Movie successfully add to watchlist", 'close', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 3000
    })

    this.refreshMovies$.next(true);
  }

  removeWatchList() {
    this.movieService.removeFromWatchlist(this.movieId)
    this.snackbar.open("Movie successfully removed to watchlist", 'close', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 3000
    })

    this.refreshMovies$.next(true);
  }
}
