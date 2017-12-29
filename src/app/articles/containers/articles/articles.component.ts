import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../shared/services/articles.service';

@Component({
  selector: 'app-articles',
  styleUrls: ['articles.component.scss'],
  template: `
    <div>
      <app-article-list
        [articles]="articles">
      </app-article-list>
    </div>
  `
})
export class ArticlesComponent implements OnInit {

  articles: Article[];

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    // Retrieve the prefetched articles
    this.route.data.subscribe(
      (data: { articles: Article[] }) => {
        this.articles = data.articles;
      }
    );
  }
}
