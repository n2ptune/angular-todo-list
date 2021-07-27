import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styles: []
})
export class InputComponent implements OnChanges {
  @Input() todoItem: string = ''
  @Output() newTodoItem = new EventEmitter<string>()
  @Output() changeTodoItem = new EventEmitter<string>()

  constructor() {}

  onEnter() {
    this.newTodoItem.emit()
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.todoItem)
  }
}
