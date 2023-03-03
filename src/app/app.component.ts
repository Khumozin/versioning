import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { map, of } from 'rxjs';

import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Versioning';

  private http = inject(HttpClient);

  public appVersion = `v${environment.appVersion}`;

  public buildDate$ = environment.production
    ? this.http
        .get<any>(`${environment.repoUrl}${environment.appVersion}`)
        .pipe(map((release) => new Date(release.published_at)))
    : of(new Date());
}
