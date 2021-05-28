import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HandsetService } from './core/services/handset.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'cd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  isDarkTheme = this.themeService.isDarkTheme;
  isHandset = this.handsetService.isHandset;

  constructor(private themeService: ThemeService, private handsetService: HandsetService) { }

}