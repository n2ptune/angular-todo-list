import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component'
import { InputComponent } from './input/input.component'
import { TransitionButtonComponent } from './transition-button/transition-button.component'
import { ActiveTextPipe } from './active-text.pipe'
import { TransitionTextComponent } from './transition-text/transition-text.component'
import { TimerComponent } from './timer/timer.component'

import { AppRoutingModule } from './app-routing.module'

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    TransitionButtonComponent,
    ActiveTextPipe,
    TransitionTextComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  exports: [TimerComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
