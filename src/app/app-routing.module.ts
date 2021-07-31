import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: 'main', loadChildren: () => import('./main/main.module').then((m) => m.MainModule) },
  { path: 'about', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule) },
  { path: 'second', loadChildren: () => import('./second/second.module').then((m) => m.SecondModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
