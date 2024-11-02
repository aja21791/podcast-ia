import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  query: string = '';
  isLoading: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    if (this.query.trim()) {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/podcast'], { queryParams: { topic: this.query } });
      }, 2000);
    }
  }
}