import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Asegúrate de que esté proporcionado a nivel global
})
export class PodcastService {

  private apiUrl = 'http://localhost:3000/podcast';

  constructor(private http: HttpClient) { }

  getPodcast(topic: string): Observable<Blob> {
    const url = `${this.apiUrl}?topic=${topic}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
