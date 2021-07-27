import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveItems(items: string[]): void {
    const storageItems = window.localStorage.getItem('items')

    if (!storageItems) {
      window.localStorage.setItem('items', JSON.stringify(items, null))
    } else {
      window.localStorage.removeItem('items')
      this.saveItems(items)
    }
  }

  getItems(): string[] {
    const storageItems = window.localStorage.getItem('items')

    if (!storageItems) return []
    else return JSON.parse(storageItems) as string[]
  }
}
