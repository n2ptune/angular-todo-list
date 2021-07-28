import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-timer',
  template: ` <div>{{ time | async }}</div> `,
  styles: []
})
export class TimerComponent implements OnInit {
  time = new Observable<string>((observer) => {
    setInterval(() => observer.next(new Date().toString()), 1000)
  })

  constructor() {}

  ngOnInit(): void {}
}
