import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WaveformComponent } from '../components/waveform/waveform.component'; 
import { HttpClientModule } from '@angular/common/http';
import { TimeFormatPipe } from '../../pipe/time-format.pipe';

@Component({
  selector: 'app-podcast',
  standalone: true,
  imports: [HttpClientModule, CommonModule, WaveformComponent,TimeFormatPipe],
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.css']
})
export class PodcastComponent implements OnInit {
  @ViewChild('audio', { static: false }) audioRef!: ElementRef<HTMLAudioElement>;

  isPlaying = false;
  currentTime = 0;
  duration = 0;
  progress = 0;
  topic: string = '';
  audioUrl: string | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
      this.audioUrl = localStorage.getItem('podcastBlob') || '';
      this.topic = localStorage.getItem('podcastTopic') || 'No topic specified';
      if (this.audioUrl && this.audioRef) {
        this.audioRef.nativeElement.src = this.audioUrl;
      }
  }

  togglePlay(): void {
    const audio = this.audioRef.nativeElement;
    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  skip(seconds: number): void {
    const audio = this.audioRef.nativeElement;
    audio.currentTime += seconds;
  }

  updateProgress(): void {
    const audio = this.audioRef.nativeElement;
    this.currentTime = audio.currentTime;
    this.progress = (audio.currentTime / audio.duration) * 100;
  }

  updateDuration(): void {
    const audio = this.audioRef.nativeElement;
    this.duration = audio.duration;
  }

  onSeek(event: Event): void {
    const audio = this.audioRef.nativeElement;
    const input = event.target as HTMLInputElement;
    audio.currentTime = (input.valueAsNumber / 100) * audio.duration;
  }

  onAudioEnded(): void {
    this.isPlaying = false;
  }

  downloadPodcast(): void {
    const a = document.createElement('a');
    a.href = this.audioUrl!;
    a.download = `tu_podcast_${this.topic}.mp3`;
    a.click();
  }
}
