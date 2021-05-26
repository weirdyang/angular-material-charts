import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ThemeService } from '../core/services/theme.service';
import { HandsetService } from '../core/services/handset.service';

@Component({
  selector: 'cd-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  menuItems = ['dashboard', 'sales', 'orders', 'customers', 'products'];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  isDarkTheme$!: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver,
    private themeService: ThemeService,
    private handsetService: HandsetService) {

  }
  ngOnInit() {
    this.isDarkTheme$ = this.themeService.isDarkTheme;
    this.isHandset$.subscribe((val) => this.handsetService.setHandset(val))
  }
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

}
