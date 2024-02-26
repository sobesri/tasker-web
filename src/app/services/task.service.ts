import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasks(request?: any): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, { params: request });
  }

  getTaskById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Task>(url);
  }

  createTask(taskData: Task): Observable<any> {
    return this.http.post(this.apiUrl, taskData);
  }

  updateTask(id: number, taskData: Task): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, taskData);
  }

  deleteTask(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
