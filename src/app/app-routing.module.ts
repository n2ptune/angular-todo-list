import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MainViewsComponent } from './views/main'

const routes: Routes = [{ path: '', component: MainViewsComponent }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
