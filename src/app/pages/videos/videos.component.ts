import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeService } from '../../services/youtube.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss'
})
export class VideosComponent {
  videos: any[] = [];

  constructor(private youtubeService: YoutubeService, private sanitizer: DomSanitizer) { 

    this.youtubeService.getVideos().subscribe(videos => {
      this.videos = videos;
      console.log('Videos loaded:', this.videos);
    });
  }

  verVideo(videoId: string): void {
    window.open('https://www.youtube.com/watch?v=' + videoId, '_blank');
  }

  getSafeUrl(videoId: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }

  videoModalAbierto = false;
  videoIdActual: string | null = null;

  abrirVideoModal(videoId: string) {
    this.videoIdActual = videoId;
    this.videoModalAbierto = true;
  }

  cerrarModal() {
    this.videoModalAbierto = false;
    this.videoIdActual = null;
  }
}
