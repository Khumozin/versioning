import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { map, of } from 'rxjs';

import packageJson from '../../package.json';
import { environment } from '../environments/environment';

const buildInfo = {
  buildDate: new Date().toString(),
  version: packageJson.version,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Versioning';

  private http = inject(HttpClient);

  public buildInfo$ = environment.production
    ? this.http.get<any>(`${environment.repoUrl}`).pipe(
        map((response) =>
          Array.isArray(response) && response.length > 0
            ? {
                buildDate: response[0].published_at,
                version: response[0].name,
              }
            : buildInfo
        )
      )
    : of(buildInfo);
}
