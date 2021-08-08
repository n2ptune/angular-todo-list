import { Component, OnInit } from '@angular/core'
import { TodoService, Todo } from 'src/app/todo.service'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoList: Todo[] = []

  constructor(private todo: TodoService) {}

  ngOnInit(): void {
    this.todo.getTodoList().subscribe({
      next: async (response) => {
        const data = (await response.json()) as Todo[]
        this.todoList = data
      }
    })
  }
}
