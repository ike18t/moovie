import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MovieService } from './movie.service';

describe('MovieService', () => {
  let subject: MovieService;
  let mockHTTP;
  const queryResponse = { results: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieService],
      imports: [HttpClientTestingModule]
    });
    subject = TestBed.get(MovieService);
    mockHTTP = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    mockHTTP.verify();
  });

  describe('query', () => {
    it('returns [] when not found', async () => {
      const searchUrl = `${MovieService.SEARCH_URL}?api_key=${MovieService.API_KEY}&query=foobar`;
      const promise = subject.query('foobar');
      mockHTTP.expectOne(searchUrl).flush(queryResponse);
      expect(await promise).toEqual([]);
    });

    it('returns [] and does not make the http call when movieName is empty string', async () => {
      const searchUrl = `${MovieService.SEARCH_URL}?api_key=${MovieService.API_KEY}&query=`;
      const promise = subject.query('');
      mockHTTP.expectNone(searchUrl);
      expect(await promise).toEqual([]);
    });
  });
});
