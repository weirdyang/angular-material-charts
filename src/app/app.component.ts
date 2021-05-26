import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HandsetService } from './core/services/handset.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'cd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isDarkTheme!: Observable<boolean>;
  isHandset!: Observable<boolean>;

  constructor(private themeService: ThemeService, private handsetService: HandsetService) { }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.isHandset = this.handsetService.isHandset;
  }
}