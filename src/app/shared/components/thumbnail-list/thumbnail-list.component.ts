import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { ViewType } from '../../enums/viewtype.enum';

@Component({
  selector: 'app-thumbnail-list',
  templateUrl: './thumbnail-list.component.html',
  styleUrls: ['./thumbnail-list.component.scss']
})
export class ThumbnailListComponent extends ThumbnailComponent implements OnInit {
  readonly ViewType = ViewType;
  @Input() movies!: Movie[];
  @Input() viewType: ViewType = ViewType.GRID
  @Output() onRemovedWatchList = new EventEmitter();
  override ngOnInit(): void {
    
  }

  removeWatchList(movieId: string) {
    this.movieService.removeFromWatchlist(movieId)
    this.onRemovedWatchList.emit()
  }
}
