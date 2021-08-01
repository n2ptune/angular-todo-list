import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TodoDetailComponent } from './todo-detail/todo-detail.component'
import { TodoListComponent } from './todo-list/todo-list.component'

const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: ':id', component: TodoDetailComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {}
