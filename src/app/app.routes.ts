import { Routes } from '@angular/router';
import { TaskListComponent } from './components/taskList/task-list.component';

export const routes: Routes = [
  { path: 'tasks', pathMatch: 'full', component: TaskListComponent },
  // implement the get by Id component
];
