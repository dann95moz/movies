import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/movies.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  movie!: Movie
  constructor(router: Router, private sanitizer: DomSanitizer) {
    if (history.state.data) {
      console.log(history.state.data);
      
      this.movie = history.state.data;
    } else {
      router.navigate(['home'])
    }


  }
  getSafeUrl(url: string): SafeResourceUrl {
    let videoId = url.split('v=')[1];
    let embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
  
}
