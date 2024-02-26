import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css',
})
export class TaskDetailComponent implements OnInit {
  selectedTask: Task | undefined;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskService
        .getTaskById(Number(id))
        .subscribe((task: Task) => (this.selectedTask = task));
    }
  }
}
