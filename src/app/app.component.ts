import { Component, OnInit } from '@angular/core'
import { StorageService } from './storage.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.template.html',
  styles: []
})
export class AppComponent implements OnInit {
  todoList: string[] = []
  todoItem: string = ''

  constructor(private storageSerivce: StorageService) {}

  addItem() {
    this.todoList.push(this.todoItem)
    this.todoItem = ''
    this.storageSerivce.saveItems(this.todoList)
  }

  ngOnInit() {
    this.todoList = this.storageSerivce.getItems()
  }
}
