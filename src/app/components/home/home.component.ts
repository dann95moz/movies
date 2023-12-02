import { Component } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Movie } from 'src/app/interfaces/movies.interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public moviesService: MoviesService) {


  }
  favorites: boolean[] = []

  titleSort: string = ''
  dateSort : string = ''
  
  moviesList: Observable<Movie[]> = this.moviesService.getMovies().pipe(tap((movies) => {
    this.favorites.length = movies.length
    this.favorites.fill(false)
    Object.entries(localStorage).forEach(data => {
      const isNumber=  !isNaN(parseInt(data[0]))
       if (isNumber) {
       this.favorites[parseInt(data[0])]= Boolean(data[1])
       }
     });
  
  }))
  sortByTitle(order: string) {
    this.moviesList = this.moviesList.pipe(
      map((movies) => movies.sort((a, b) => {
        return order === "asc" ? a.Title.localeCompare(b.Title) : b.Title.localeCompare(a.Title);
      }))
    );
  }
  sortByRelease(order: string) {
    this.moviesList = this.moviesList.pipe(
      map((movies) => movies.sort((a, b) => {
        const dateA = new Date(a['Released date']);
        const dateB = new Date(b['Released date']);
        return order === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      }))
    );
  }
  toggleFavorite( index: number) {
   
    this.favorites[index] = !this.favorites[index];
    
    this.favorites[index] ?
      localStorage.setItem(`${index}`, `${this.favorites[index]}`) :
    localStorage.removeItem(`${index}`)

  
  }
}
