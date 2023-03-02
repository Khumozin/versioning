import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { map, of } from 'rxjs';

import packageJson from '../../package.json';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Versioning';

  private http = inject(HttpClient);

  public version: string = packageJson.version;

  public buildDate$ = environment.production
    ? this.http
        .get<any>(`${environment.repoUrl}${packageJson.version}`)
        .pipe(map((response) => new Date(response.published_at)))
    : of(new Date());
}
