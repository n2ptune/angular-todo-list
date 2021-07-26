import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styles: [
  ]
})
export class InputComponent {
  todoItem: string = ''

  @Output() newTodoItem = new EventEmitter<string>()

  constructor() {
  }

  onEnter() {
    if (this.todoItem) {
      this.newTodoItem.emit(this.todoItem)
      this.todoItem = ''
    }
  }
}
