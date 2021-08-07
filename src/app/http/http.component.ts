import { PlaceholderService } from './placeholder.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.scss']
})
export class HttpComponent implements OnInit {

  constructor(private placeholder: PlaceholderService) {
    const todos = this.placeholder.getTodos()
    console.log(todos)
  }

  ngOnInit(): void {
  }

}
