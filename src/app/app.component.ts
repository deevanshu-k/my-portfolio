import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToggleScreenService } from './services/toggle-screen.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { DisableLinkDirective } from './directives/disable-link.directive';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, DisableLinkDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('stoggle', [
      transition(':enter', [
        style({
          height: '0%'
        }),
        animate('600ms', style({ height: '50%' }))
      ]),
      transition(':leave', [
        animate('1000ms', style({ height: '0%' }))
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
    ]),
    trigger('tmenu',[
      transition(':enter', [
        style({
          width: '0%',
          opacity: '0%'
        }),
        animate('200ms', style({ width: '100%', opacity: '100%' }))
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: '0%' })),
        animate('200ms', style({ width: '0%' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'Welcome!';
  menutoggle = false;
  togglescreen: boolean = false;
  togglescreenspan: boolean = false;
  togglescreenspanloader: boolean = false;
  routeArray: { label: string, url: string }[] = [
    { label: 'home', url: 'home' },
    { label: 'about', url: 'about' },
    { label: 'skills', url: 'skills' },
    { label: 'projects', url: 'projects' },
    { label: 'contact me', url: 'contact-me' },
    { label: 'blog', url: 'blog' }
  ];

  constructor(
    private router: Router,
    private toggleScreenService: ToggleScreenService
  ) {
   }

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
        this.menutoggle=false;
        this.togglescreen = true;
        setTimeout(() => {
          this.togglescreenspan = true;
        }, 600);
        setTimeout(() => {
          this.togglescreenspanloader = true;
        }, 1500);
        setTimeout(() => {
          this.togglescreenspan = false;
          this.togglescreenspanloader = false;
          this.toggleScreenService.toggleScreen.next(false);
        }, 2600);
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
