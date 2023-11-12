import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToggleScreenService } from './services/toggle-screen.service';
import { trigger, transition, state, style, animate, group } from '@angular/animations';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('stoggle', [
      transition(':enter', [
        style({
          height: '0%'
        }),
        animate('1000ms', style({ height: '50%' }))
      ]),
      transition(':leave', [
        animate('2000ms', style({ height: '0%' }))
      ])
    ]),
    trigger('sToggleInBorder', [
      transition(':enter', [
        style({
          width: '100%'
        }),
        animate('500ms', style({ width: '50%' }))
      ])
    ]),
    trigger('sToggleBorderLoader', [
      transition(':enter', [
        style({
          width: '0%'
        }),
        animate('1000ms', style({ width: '100%' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'sample17trying';
  togglescreen: boolean = false;
  togglescreenspan: boolean = false;
  togglescreenspanloader: boolean = false;
  routeArray: { label: string, url: string }[] = [
    { label: 'home', url: 'home' },
    { label: 'skills', url: 'skills' },
    { label: 'projects', url: 'projects' }
  ];

  constructor(
    private router: Router,
    private toggleScreenService: ToggleScreenService
  ) { }

  ngOnInit(): void {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     this.toggleScreenService.toggleScreen.next(true);
    //   }
    //   if (event instanceof RouteConfigLoadStart) {
    //     console.log("Load Start !");
    //   }
    //   else if (event instanceof RouteConfigLoadEnd) {
    //     console.log("Load End !");
    //   }
    // });

    this.toggleScreenService.toggleScreen.subscribe(d => {
      if (d) {
        this.togglescreen = true;
        setTimeout(() => {
          this.togglescreenspan = true;
        }, 1000);
        setTimeout(() => {
          this.togglescreenspanloader = true;
        }, 2000);
        setTimeout(() => {
          this.togglescreenspan = false;
          this.togglescreenspanloader = false;
          this.toggleScreenService.toggleScreen.next(false);
        }, 3000);
      }
      else {
        this.togglescreen = false;
      }
    });
  }

  toggleRoute(route: string) {
    this.toggleScreenService.toggleScreen.next(true);
    setTimeout(() => {
      this.router.navigate([route]);
    }, 1000);
  }
}
