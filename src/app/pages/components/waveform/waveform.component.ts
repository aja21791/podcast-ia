import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-waveform',
  standalone: true,
  imports: [],
  templateUrl: './waveform.component.html',
  styleUrl: './waveform.component.css'
})
export class WaveformComponent {
  @Input() isPlaying: boolean = false;
}
