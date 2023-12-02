import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { WatchListComponent } from './components/watch-list/watch-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'details/:id', component: DetailsComponent
  },
  {
    path:'watchList', component: WatchListComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
