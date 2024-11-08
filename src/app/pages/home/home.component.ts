import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { PodcastService } from '../../service/podcast.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule,FormsModule, NgIf,NgClass],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  query: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private podcastService: PodcastService) {}

  onSubmit() {
    if (this.query.trim()) {
      this.isLoading = true;

      this.podcastService.getPodcast(this.query).subscribe(
        blob => {
          this.isLoading = false;
          const reader = new FileReader();
          reader.onload = () => {
            const base64data = reader.result;
            localStorage.setItem('podcastBlob', base64data as string);
            localStorage.setItem('podcastTopic', this.query);
            this.playPodcast();
          };
          reader.readAsDataURL(blob);
        },
        error => {
          this.isLoading = false;
          console.error('Error fetching podcast:', error);
        })
    }
  }

  playPodcast(): void {
    this.router.navigate(['/podcast']);
  }
}