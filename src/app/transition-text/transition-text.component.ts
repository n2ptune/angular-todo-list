import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-transition-text',
  template: ` <div>Hello I'm Transition Text (fade)</div>
    <app-timer></app-timer>`,
  styleUrls: ['./transition-text.style.scss']
})
export class TransitionTextComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
