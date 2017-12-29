import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Article } from '../../shared/services/articles.service';

@Component({
  selector: 'app-article-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['article-form.component.scss'],
  template: `
    <div class="article-form">
      <form [formGroup]="form">

      <mat-form-field>
        <input
          matInput
          placeholder="Title*"
          formControlName="title">
        <mat-error *ngIf="required('title')">
          Title is <strong>required</strong>
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <input
          matInput
          placeholder="Content*"
          formControlName="content">
        <mat-error *ngIf="required('content')">
          Content is <strong>required</strong>
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <input
          matInput
          placeholder="Author*"
          formControlName="author">
        <mat-error *ngIf="required('author')">
          Author is <strong>required</strong>
        </mat-error>
      </mat-form-field>

      <div class="submit">
        <button mat-raised-button color="primary" *ngIf="!exists" (click)="createArticle()">Create article</button>
        <button mat-raised-button color="primary" *ngIf="exists" (click)="updateArticle()">Update article</button>
        <a mat-raised-button color="warn" [routerLink]="['../']">Cancel</a>
        <button mat-raised-button color="primary" *ngIf="exists" (click)="removeArticle()">Delete article</button>
      </div>

      </form>
    </div>
  `
})
export class ArticleFormComponent implements OnChanges {

  exists = false;

  @Input()
  article: Article;

  @Output()
  create = new EventEmitter<Article>();

  @Output()
  update = new EventEmitter<Article>();

  @Output()
  remove = new EventEmitter<Article>();

  form = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    author: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.article) {
      this.exists = true;

      const value = this.article;
      this.form.patchValue(value);
    }
  }

  required(field) {
    return (
      this.form.get(field).hasError('required') &&
      this.form.get(field).touched
    );
  }

  createArticle() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateArticle() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeArticle() {
    this.remove.emit();
  }
}
