import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatDividerModule],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'dueDate',
    'action',
  ];
  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  deleteTask(id: number): void {
    window.alert('deleteTask is not implemented');
  }

  navigateToTaskDetails(id: number): void {
    this.router.navigate(['/tasks', id]);
  }
}
