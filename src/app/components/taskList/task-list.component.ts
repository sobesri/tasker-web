import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatDividerModule],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  searchTerm: string = '';
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'dueDate',
    'action',
  ];
  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTasks();
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
  }

  getTasks(): void {
    this.taskService.getTasks({ searchTerm: this.searchTerm }).subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  deleteTask(id: number): void {
    if (window.confirm('Are you sure?')) {
      this.taskService.deleteTask(id).subscribe(
        () => {
          this.getTasks();
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }

  addNewTask(): void {
    const modal = this.dialog.open(TaskModalComponent);
    modal.afterClosed().subscribe(() => this.getTasks());
  }

  editTask(id: number): void {
    this.taskService.getTaskById(id).subscribe(
      (task: Task) => {
        const modal = this.dialog.open(TaskModalComponent, {
          data: task,
        });
        modal.afterClosed().subscribe(() => this.getTasks());
      },
      (error) => {
        console.error('Error fetching task:', error);
      }
    );
  }
}
