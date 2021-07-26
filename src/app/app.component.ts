import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.template.html',
  styles: []
})
export class AppComponent {
  todoList: string[] = []

  addItem(item: string) {
    this.todoList.push(item)
  }
}
