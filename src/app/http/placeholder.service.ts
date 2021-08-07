import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

type Todo = {
  [key: string]: any
}

@Injectable({
  providedIn: 'root'
})
export class PlaceholderService {
  todos: Observable<Todo> | null

  constructor(private http: HttpClient) {
    this.todos = null
  }

  getTodos(): Observable<Todo> {
    this.todos = this.http.get('https://jsonplaceholder.typicode.com/todos/1')
    return this.todos
  }
}
