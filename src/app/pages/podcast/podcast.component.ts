import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WaveformComponent } from '../../components/waveform/waveform.component';

@Component({
  selector: 'app-podcast',
  standalone: true,
  imports: [CommonModule, WaveformComponent],
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.css']
})
export class PodcastComponent {
  @ViewChild('audio', { static: false }) audioRef!: ElementRef<HTMLAudioElement>;

  isPlaying = false;
  currentTime = 0;
  duration = 0;
  progress = 0;
  topic: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.topic = params['topic'] || 'No topic specified';
    });
  }

  togglePlay() {
    if (this.isPlaying) {
      this.audioRef.nativeElement.pause();
    } else {
      this.audioRef.nativeElement.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  updateProgress() {
    const audio = this.audioRef.nativeElement;
    this.currentTime = audio.currentTime;
    this.progress = (audio.currentTime / audio.duration) * 100 || 0;
  }

  updateDuration() {
    this.duration = this.audioRef.nativeElement.duration;
  }

  onAudioEnded() {
    this.isPlaying = false;
    this.currentTime = 0;
    this.progress = 0;
  }

  onSeek(event: Event) {
    const audio = this.audioRef.nativeElement;
    const target = event.target as HTMLInputElement;
    const seekTime = (parseFloat(target.value) / 100) * audio.duration;
    audio.currentTime = seekTime;
  }

  skip(seconds: number) {
    const audio = this.audioRef.nativeElement;
    audio.currentTime = Math.min(Math.max(audio.currentTime + seconds, 0), audio.duration);
    this.updateProgress();
  }
}
