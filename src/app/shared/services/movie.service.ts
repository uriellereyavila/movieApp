import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private watchListKey: string = 'movieWatchList'
  constructor(private http: HttpClient) {
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('assets/movies.json');
  }

  getWatchList(): string[] {
    const watchlistData = localStorage.getItem(this.watchListKey);
    return watchlistData ? JSON.parse(watchlistData) : [];
  }

  addWatchlist(movieId: string): void {
    const watchlist = this.getWatchList();
    watchlist.push(movieId);
    this.updateWatchlist(watchlist);
  }

  isMovieWatchList(movieId: string): boolean {
    const watchlist = this.getWatchList();

    return watchlist.includes(movieId)
  }

  removeFromWatchlist(movieId: string): void {
    let watchlist = this.getWatchList();
    watchlist = watchlist.filter((item: string) => item !== movieId);
    this.updateWatchlist(watchlist);
  }

  getMovieImage(title: string) {
    return `/assets/images/${title}`
  }

  private updateWatchlist(watchlist: string[]): void {
    localStorage.setItem(this.watchListKey, JSON.stringify(watchlist));
  }
}
