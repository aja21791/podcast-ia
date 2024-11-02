import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PodcastComponent } from './pages/podcast/podcast.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'podcast', component: PodcastComponent },
];
