import { Injectable } from '@angular/core'
import { Observable, from } from 'rxjs'

export type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor() {}

  getTodoList(): Observable<Response> {
    return from(fetch('https://jsonplaceholder.typicode.com/todos'))
  }
}
