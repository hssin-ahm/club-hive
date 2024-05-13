import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from '../jwt.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private server = environment.uri + '/api';

  constructor(private http: HttpClient, private jwtservice: JwtService) {}

  // define function to upload files
  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.server}/file/upload`, formData, {
      headers: this.jwtservice.createAuhtorizationHeader() || new HttpHeaders(),
      reportProgress: true,
      observe: 'events',
    });
  }

  // define function to download files
  download(filename: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.server}/file/download/${filename}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
      headers: this.jwtservice.createAuhtorizationHeader() || new HttpHeaders(),
    });
  }

  getAllCate() {
    return this.http.get(this.server + '/getallcategory', {
      headers: this.jwtservice.createAuhtorizationHeader(),
    });
  }

  addResource(resource) {
    return this.http.post(this.server + '/addresource', resource, {
      headers: this.jwtservice.createAuhtorizationHeader(),
    });
  }

  getAllResources() {
    return this.http.get(this.server + '/getallresources', {
      headers: this.jwtservice.createAuhtorizationHeader(),
    });
  }

  addCat(cat) {
    return this.http.post(this.server + '/addcategory', cat, {
      headers: this.jwtservice.createAuhtorizationHeader(),
    });
  }
}
