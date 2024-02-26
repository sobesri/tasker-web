import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

const dueDateValidation = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    return new Date(control.value) < new Date()
      ? { invalidDate: { value: control.value, message: 'Date Invalid' } }
      : null;
  };
};

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css',
})
export class TaskModalComponent {
  myForm: FormGroup;
  formTitle: string = 'Add new task';

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Task
  ) {
    if (data) {
      this.formTitle = data.title;
      this.myForm = new FormGroup({
        id: new FormControl(data.id),
        title: new FormControl(data.title, Validators.required),
        description: new FormControl(data.description, Validators.required),
        dueDate: new FormControl(new Date(data.dueDate), [
          Validators.required,
          dueDateValidation(),
        ]),
      });
    } else {
      this.myForm = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        dueDate: new FormControl(new Date(), [
          Validators.required,
          dueDateValidation(),
        ]),
      });
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      if (form.value.id) {
        this.taskService
          .updateTask(
            form.value.id,
            new Task(
              form.value.title,
              form.value.description,
              new Date(form.value.dueDate)
            )
          )
          .subscribe(
            (result: any) => {
              this.closeDialog();
            },
            (error) => {
              console.error('Error fetching tasks:', error);
            }
          );
      } else {
        this.taskService
          .createTask(
            new Task(
              form.value.title,
              form.value.description,
              new Date(form.value.dueDate)
            )
          )
          .subscribe(
            (result: any) => {
              this.closeDialog();
            },
            (error) => {
              console.error('Error fetching tasks:', error);
            }
          );
      }
    } else {
      const dueDateErrors = form.controls['dueDate']?.errors;
      if (dueDateErrors && !dueDateErrors['required']) {
        window.alert('Invalid Date, choose a date after today');
      } else {
        window.alert('Required fields missing');
      }
    }
  }
}
