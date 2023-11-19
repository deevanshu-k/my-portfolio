
import { Directive, Input, Optional } from '@angular/core';
import { RouterLink, RouterLinkWithHref } from '@angular/router';


@Directive({
    selector: '[routerLink][disableLink]',
    standalone: true
  })
  export class DisableLinkDirective {
  
    @Input() disableLink!: boolean;
  
    constructor(
        // Inject routerLink
        @Optional() routerLink: RouterLink,
        @Optional() RouterLinkWithHref: RouterLinkWithHref
    ) {
  
        const link =  routerLink || RouterLinkWithHref;
  
        // Save original method
        const onClick = link.onClick;
  
        // Replace method
        link.onClick = (...args) => {
            if (this.disableLink) {
                return false;
            } else {
                return onClick.apply(link, args);
            }
        };
    }
  
  }
  