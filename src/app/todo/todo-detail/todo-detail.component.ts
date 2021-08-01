import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  id: number = 0

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe((param) => {
      this.id = Number(param.get('id'))
    })
  }

  ngOnInit(): void {
    console.log(this.id)
  }
}
