import { Routes } from '@angular/router';
import { TaskListComponent } from './components/taskList/task-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';

const routes: Routes = [
  // { path: '', redirectTo: '/tasks', pathMatch: 'full' }, // Default route redirects to /tasks
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/:id', component: TaskDetailComponent },
];

export { routes };
