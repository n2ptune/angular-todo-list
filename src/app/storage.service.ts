import { Injectable } from '@angular/core'
import { from, Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  saveItems(items: string[]): void {
    const storageItems = window.localStorage.getItem('items')

    if (!storageItems) {
      window.localStorage.setItem('items', JSON.stringify(items, null))
    } else {
      window.localStorage.removeItem('items')
      this.saveItems(items)
    }
  }

  getItems(): Observable<string[]> {
    const storageItems = window.localStorage.getItem('items')

    if (!storageItems) return from([])
    else return of(JSON.parse(storageItems))
  }
}
