import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  constructor(private http: HttpClient) { }

  getPlaylistVideos(playlistId: string): Observable<any[]> {
    const url = `${environment.API_URL}/playlistItems`;
    const params = {
      part: 'snippet',
      maxResults: '50',
      playlistId: playlistId,
      key: environment.API_KEY
    };
    
    return this.http.get(url, { params }).pipe(
      map((response: any) => {
        return response.items.map((item: any) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.default.url,
          position: item.snippet.position
        }));
      })
    );
  }

  getVideos() {
    const parametros = new HttpParams()
      .set('part', 'snippet')
      .set('channelId', environment.CHANNEL_ID)
      .set('maxResults', '50') 
      .set('key', environment.API_KEY)
      .set('order', 'date')
  
    const vinculos = `${environment.API_URL}/search`;
    return this.http.get(vinculos, { params: parametros }).pipe(
      map((resp: any) => resp.items) 
    );
  }

  // getVideos() {
  //   const parametros = new HttpParams().set('part', 'snippet ').set('channelId',this.channelId).set('key',this.apiKey);
  //   let vinculos = `${this.apiUrl}/search`;
  //   return this.http.get(vinculos, {params:parametros}).pipe(map(resp=>resp));
  // }
}