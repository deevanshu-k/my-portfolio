import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToggleScreenService } from './services/toggle-screen.service';
import { trigger, transition, state, style, animate, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    
    trigger("slideInFronUp", [
      state('in', style({
        'max-height': '50%', 'opacity': '1', 'visibility': 'visible'
      })),
      state('out', style({
        'max-height': '0%', 'opacity': '0', 'visibility': 'hidden'
      })),
      transition('in => out', [group([
        animate('400ms ease-in-out', style({
          'opacity': '0'
        })),
        animate('600ms ease-in-out', style({
          'max-height': '0px'
        })),
        animate('700ms ease-in-out', style({
          'visibility': 'hidden'
        })),
        transition('out => in', [group([
          animate('1ms ease-in-out', style({
            'visibility': 'visible'
          })),
          animate('600ms ease-in-out', style({
            'max-height': '500px'
          })),
          animate('800ms ease-in-out', style({
            'opacity': '1'
          }))
        ]
        )])
      ]
      )])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'sample17trying';
  togglescreen: boolean = false;

  constructor(
    private router: Router,
    private toggleScreenService: ToggleScreenService
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.toggleScreenService.toggleScreen.next(true);
      }
      if (event instanceof RouteConfigLoadStart) {
        console.log("Load Start !");
      }
      else if (event instanceof RouteConfigLoadEnd) {
        console.log("Load End !");
      }
    });

    this.toggleScreenService.toggleScreen.subscribe(d => {
      if (d) {
        this.togglescreen = true;
        setTimeout(() => {
          this.toggleScreenService.toggleScreen.next(false);
        }, 2000);
      }
      else {
        this.togglescreen = false;
      }
    });
  }
}
