import { Component } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Movie } from 'src/app/interfaces/movies.interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent {
  constructor(public moviesService: MoviesService){}
  favorites: boolean[] = []
  moviesList: Observable<Movie[]> = this.moviesService.getMovies().pipe(tap((movies) => {
    this.favorites.length = movies.length
    this.favorites.fill(false)
    Object.entries(localStorage).forEach(data => {
      const isNumber=  !isNaN(parseInt(data[0]))
       if (isNumber) {
       this.favorites[parseInt(data[0])]= Boolean(data[1])
       }
     });
  
  }),
  map((movies)=>movies.filter((movie, index)=> this.favorites[index] )))
}
