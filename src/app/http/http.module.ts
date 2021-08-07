import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpRoutingModule } from './http-routing.module';
import { HttpComponent } from './http.component';


@NgModule({
  declarations: [
    HttpComponent
  ],
  imports: [
    CommonModule,
    HttpRoutingModule
  ]
})
export class HttpModule { }
