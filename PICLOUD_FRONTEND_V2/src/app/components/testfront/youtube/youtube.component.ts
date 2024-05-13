import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss'],
})
export class YoutubeComponent {
  houssem!:any[];
  isLoading: boolean = false;
  error: string = '';
  response: any = {};
  search: any = { keyword: '', channelId: '', type: '', maxResults: 5 };
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}
  ngOnInit(): void {}

  searchYoutube(): void {
    this.isLoading = true;
    const url = 'https://www.googleapis.com/youtube/v3/search';
    const urlParams = new HttpParams()
      .set('part', 'snippet')
      .set('key', 'AIzaSyC7gwTFPTMFnCGym6SZpXgDJAcCO-hO0sU')
      .set('q', this.search.keyword)
      .set('type', this.search.type)
      .set('channelId', this.search.channelId)
      .set('maxResults', this.search.maxResults);
    const options = { params: urlParams };
    this.http.get<any>(url, options).subscribe(
      (data) => {
        this.response = data;
        console.log(this.response);
        this.isLoading = false;
      },
      (err) => {
        this.error = err;
        console.log(err);
        this.isLoading = false;
      }
    );
  }
  getVideoSource(id: string): SafeResourceUrl {
    if (id != '') {
      const url = 'https://www.youtube.com/embed/' + id;
      // this.houssem.push(url);
      // console.log(this.houssem);
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      return '';
    }
  }
}
