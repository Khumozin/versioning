import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { map, of } from 'rxjs';

import packageJson from '../../package.json';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  template: `
    <div
      class="flex flex-col w-full h-[100vh] justify-center items-center bg-gray-200"
    >
      <span class="font-medium text-4xl text-gray-600"
        >App Version: {{ version }}</span
      >
      <span class="font-medium text-sm text-gray-600 mt-2"
        >Build Date:
        {{ buildDate$ | async | date : 'd MMM yyyy HH:mm:ss a zzzz' }}</span
      >

      <span class="font-light text-xs text-gray-600 mt-4"
        >Documentation coming soon...</span
      >

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-4 h-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        />
      </svg>
    </div>
  `,
  styles: [``],
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
