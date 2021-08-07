import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [{ path: 'todo', loadChildren: () => import('./todo/todo.module').then((m) => m.TodoModule) }, { path: 'http', loadChildren: () => import('./http/http.module').then(m => m.HttpModule) }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
