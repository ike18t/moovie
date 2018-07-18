import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  static readonly DOMAIN = 'https://www.themoviedb.org';
  static readonly API_KEY = 'YOUR_KEY_GOES_HERE';
  static readonly SEARCH_PATH = 'search/multi';
  static readonly SEARCH_URL = [MovieService.DOMAIN, MovieService.SEARCH_PATH].join('/');

  constructor(private httpClient: HttpClient) { }

  async query(movieName: string): Promise<any> {
    if (movieName === '') { return []; }
    const searchUrl = `${MovieService.SEARCH_URL}?api_key=${MovieService.API_KEY}&query=${movieName}`;
    return (await this.httpClient.get(searchUrl).toPromise() as any).results;
  }
}
