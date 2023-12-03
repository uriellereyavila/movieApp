import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewType } from '../../enums/viewtype.enum';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent implements OnInit {
  @Input() movie!: Movie;
  @Output() onClickAddToWatchlist = new EventEmitter();

  constructor(
    protected movieService: MovieService,
    private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    
  }

  getMovieImg(title: string) {
    return this.movieService.getMovieImage(title)
  }

  isMovieWatchList(movieId: string) {
    return this.movieService.isMovieWatchList(movieId)
  }

  addToWatchList(movieId: string) {
    this.movieService.addWatchlist(movieId)
    this.snackbar.open("Movie successfully add to watchlist", 'close', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 3000
    })

    this.onClickAddToWatchlist.emit();
  }
}
