import { Component, Input, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import { Article } from '../../shared/services/articles.service';
import { AfterViewInit, OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-article-list',
  styleUrls: ['article-list.component.scss'],
  template: `
    <div class="article-list">
      <div class="table-header">
        <mat-form-field>
          <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Filter">
        </mat-form-field>

        <a mat-raised-button color="primary" class="create-article" [routerLink]="'../articles/new'">
          <mat-icon>add</mat-icon> New
        </a>

      </div>

      <div class="container mat-elevation-z8">
        <mat-table [dataSource]="dataSource" matSort>

          <!-- Title column -->
          <ng-container matColumnDef="title">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Title </mat-header-cell>
            <mat-cell *matCellDef="let row"> {{ row.title }} </mat-cell>
          </ng-container>

          <!-- Author column -->
          <ng-container matColumnDef="author">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Author </mat-header-cell>
            <mat-cell *matCellDef="let row"> {{ row.author }} </mat-cell>
          </ng-container>

          <!-- Created at column -->
          <ng-container matColumnDef="createdAt">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Created At </mat-header-cell>
            <mat-cell *matCellDef="let row"> {{ row.created_at | date : 'MMM d, yyyy' }} </mat-cell>
          </ng-container>

          <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
          <mat-row *matRowDef="let row; columns: displayedColumns;">
          </mat-row>
        </mat-table>

      <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
    </div>
    </div>
  `
})
export class ArticleListComponent implements OnInit, AfterViewInit {

  displayedColumns = ['title', 'author', 'createdAt'];
  dataSource: MatTableDataSource<Article>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input()
  articles: Article[];

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.articles);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
