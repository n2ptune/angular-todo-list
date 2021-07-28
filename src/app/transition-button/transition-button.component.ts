import { Component, OnInit } from '@angular/core'
import { trigger, state, style, animate, transition } from '@angular/animations'

@Component({
  selector: 'app-transition-button',
  template: `
    <div style="display:block;">
      <button (click)="handleClick()">
        Transition {{ active | activeText }}
      </button>
      <app-transition-text
        [@trtr]="active ? 'active' : 'inactive'"
      ></app-transition-text>
    </div>
  `,
  styles: [],
  animations: [
    trigger('trtr', [
      state(
        'active',
        style({
          color: 'red',
          opacity: 1
        })
      ),
      state(
        'inactive',
        style({
          color: 'blue',
          opacity: 0
        })
      ),
      transition('* => *', animate('300ms ease-in-out'))
    ])
  ]
})
export class TransitionButtonComponent implements OnInit {
  active = false

  constructor() {}

  ngOnInit(): void {}

  handleClick() {
    this.active = !this.active
  }
}
