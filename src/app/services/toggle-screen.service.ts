import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleScreenService {
  toggleScreen = new Subject<boolean>();

  constructor() { }
}
