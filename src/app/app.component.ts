import { Component } from '@angular/core';

import packageJson from '../../package.json';
import build from '../assets/build.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Versioning';
  public version: string = packageJson.version;
  public buildDate = build.date;
}
