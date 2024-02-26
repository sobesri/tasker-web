import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { TaskListComponent } from './app/components/taskList/task-list.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
