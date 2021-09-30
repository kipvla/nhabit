import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  constructor(private http: HttpClient) {}

  private backendUrl = environment.backendURL;
  // private backendUrl = 'http://localhost:3000/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.backendUrl);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(
      `${this.backendUrl}register`,
      JSON.stringify(user),
      this.httpOptions
    );
  }

  findUserByUid(uid: string): Observable<User> {
    return this.http.get<User>(`${this.backendUrl}login/${uid}`);
  }

  findUserByUidAndAddDisplayName(
    uid: string,
    displayName: string
  ): Observable<User> {
    return this.http.put<User>(
      `${this.backendUrl}update/${uid}`,
      { displayName },
      this.httpOptions
    );
  }
}
