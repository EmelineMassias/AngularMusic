import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "../../environments/environment"
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Music } from '../models/music';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  apiUrl = environment.apiUrl + "musics";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Music[]> {
    return this.httpClient.get<Music[]>(this.apiUrl + ".json").pipe(
      retry(1),
      catchError(this.errorHandler),
    )
  }

  getOne(id: number): Observable<Music> {
    return this.httpClient.get<Music>(this.apiUrl + '/' + id + '.json').pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message
    } else {
      errorMessage = 'Code: ${error.status}\n message: ${error.message}';
    }

    alert(errorMessage);
    return throwError(errorMessage);
  }
}
