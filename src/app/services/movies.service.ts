import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movies.interface';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { 
  
  }
  getMovies() {
    return this.http.get<Movie[]>('../../assets/movies.json').pipe(
      catchError(error => {
     
        return throwError(() => new Error('An error occured when trying to get data', error));
      })
    )
  }
}
