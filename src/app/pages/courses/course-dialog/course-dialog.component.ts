import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-course-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule
  ],
  template: `
    <h2 mat-dialog-title>{{data ? 'Editar curso' : 'Crear curso'}}</h2>
    <mat-dialog-content>
      <form #courseForm="ngForm">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Title</mat-label>
          <input matInput [(ngModel)]="course.title" name="title" required>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Instructor</mat-label>
          <input matInput [(ngModel)]="course.instructor" name="instructor" required>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Description</mat-label>
          <textarea matInput [(ngModel)]="course.description" name="description" required></textarea>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Duration</mat-label>
          <input matInput [(ngModel)]="course.duration" name="duration" required>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Level</mat-label>
          <input matInput [(ngModel)]="course.level" name="level" required>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Image URL</mat-label>
          <input matInput [(ngModel)]="course.image" name="image" required>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!courseForm.form.valid">
        {{data ? 'Update' : 'Create'}}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    mat-dialog-content {
      min-width: 500px;
    }
  `]
})
export class CourseDialogComponent {
  course: any;

  constructor(
    // docu: https://v18.material.angular.io/components/dialog/examples
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.course = data ? {...data} : {
      title: '',
      instructor: '',
      description: '',
      duration: '',
      level: '',
      image: '',
      students: 0,
      rating: 0,
      tags: []
    };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.course);
  }
}