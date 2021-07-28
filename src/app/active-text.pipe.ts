import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'activeText'
})
export class ActiveTextPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? 'Off' : 'On'
  }
}
