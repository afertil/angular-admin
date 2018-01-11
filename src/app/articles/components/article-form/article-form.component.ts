import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnChanges,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  SimpleChanges
} from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { Article } from '../../shared/services/articles.service';
import { AuthService } from '../../../auth/shared/services/auth.service';
import { APP_CONFIG } from '../../../../config';

@Component({
  selector: 'app-article-form',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['article-form.component.scss'],
  template: `
    <div class="article-form">

      <div class="upload-image">
        <button *ngIf="!uploader?.queue[0] && !imageSrc" mat-raised-button (click)="inputFile.click()">
          <mat-icon>file_upload</mat-icon> Import image
        </button>
        <img *ngIf="imageSrc" class="preview" [src]="imageSrc">
        <span class="article-form__image">{{ uploader?.queue[0]?.file.name || this.article.imageUrl }}</span>
        <button *ngIf="uploader?.queue[0] || imageSrc" mat-raised-button color="warn" (click)="removeImage(uploader?.queue[0])">
          <mat-icon>delete</mat-icon> Remove
        </button>
        <input #inputFile type="file" ng2FileSelect [uploader]="uploader" [style.display]="'none'">
      </div>

      <form [formGroup]="form">

      <input type="text" formControlName="imageUrl" [style.display]="'none'">

      <mat-form-field>
        <input
          matInput
          placeholder="Title*"
          formControlName="title">
        <mat-error *ngIf="required('title')">
          Title is <strong>required</strong>
        </mat-error>
      </mat-form-field>

      <mat-form-field class="article-form__content">
        <textarea
          matInput
          placeholder="Content*"
          formControlName="content">
        </textarea>
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
        <button mat-raised-button color="primary" *ngIf="exists" [disabled]="!form.dirty" (click)="updateArticle()">Update article</button>
        <a mat-raised-button color="warn" [routerLink]="['../']">Cancel</a>
        <button mat-raised-button color="primary" *ngIf="exists" (click)="removeArticle()">Delete article</button>
      </div>

      </form>
    </div>
  `
})
export class ArticleFormComponent implements OnInit, OnChanges {
  exists: Boolean = false;
  imageSrc: String = '';
  uploader: FileUploader = new FileUploader({
    url: `${APP_CONFIG.api}/articles/upload`,
    authToken: this.authService.getTokens().accessToken
  });

  @Input() article: Article;

  @Output() create = new EventEmitter<Article>();
  @Output() update = new EventEmitter<Article>();
  @Output() remove = new EventEmitter<Article>();

  @ViewChild('inputFile') inputFile: ElementRef;

  form = this.fb.group({
    title: ['', Validators.required],
    imageUrl: [''],
    content: ['', Validators.required],
    author: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
      this.uploader.queue[0].upload();
    };
    this.uploader.onCompleteItem = (item, response, status, headers) => {
      if (status === 200) {
        this.form.controls.imageUrl.setValue(response);
        this.imageSrc = `${APP_CONFIG.images}/${response}`;
        this.ref.markForCheck();
      } else {
        // Error
      }
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.article) {
      this.exists = true;
      this.form.patchValue(this.article);

      if (this.article.imageUrl) {
        this.imageSrc = `${APP_CONFIG.images}/${this.article.imageUrl}`;
      }
    }
  }

  required(field) {
    return (
      this.form.get(field).hasError('required') && this.form.get(field).touched
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

  removeImage(file) {
    if (file) {
      file.remove();
    }

    this.imageSrc = this.article.imageUrl = '';
    this.form.markAsDirty();
  }
}
